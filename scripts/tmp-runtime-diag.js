const { chromium } = require('playwright');

(async () => {
  const OVERALL_TIMEOUT_MS = 150_000;
  console.log('DIAG_START');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const diag = {
    requestFailed: [],
    pageErrors: [],
    consoleErrors: [],
    dracoRequests: [],
    glbRequests: [],
    gstaticRequests: [],
  };

  await page.addInitScript(() => {
    window.__diag = [];
    window.addEventListener('unhandledrejection', (ev) => {
      const reason = ev.reason;
      window.__diag.push({
        type: 'unhandledrejection',
        message: reason && reason.message ? reason.message : String(reason),
        stack: reason && reason.stack ? String(reason.stack) : null,
      });
    });

    window.addEventListener('error', (ev) => {
      window.__diag.push({
        type: 'error',
        message: ev.message,
        filename: ev.filename,
        lineno: ev.lineno,
        colno: ev.colno,
      });
    });
  });

  page.on('requestfailed', (req) => {
    const entry = {
      url: req.url(),
      errorText: req.failure() ? req.failure().errorText : 'unknown',
      method: req.method(),
      resourceType: req.resourceType(),
    };
    diag.requestFailed.push(entry);
    console.log('REQ_FAIL', entry.method, entry.resourceType, entry.errorText, entry.url);
  });

  page.on('pageerror', (err) => {
    const message = err && err.message ? String(err.message) : String(err);
    diag.pageErrors.push({ message, stack: err && err.stack ? String(err.stack) : null });
    console.log('PAGE_ERR', message);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      const text = msg.text();
      diag.consoleErrors.push({ type: msg.type(), text });
      console.log('CONSOLE', msg.type().toUpperCase(), text);
    }
  });

  page.on('request', (req) => {
    const url = req.url();

    if (url.includes('gstatic.com/draco') || url.includes('draco/v1/decoders')) {
      diag.gstaticRequests.push(url);
      console.log('GSTATIC_REQ', url);
    }

    if (url.includes('/draco/') || url.includes('draco_decoder') || url.includes('draco_wasm_wrapper')) {
      diag.dracoRequests.push(url);
      console.log('DRACO_REQ', url);
    }

    if (url.includes('.glb')) {
      diag.glbRequests.push(url);
      console.log('GLB_REQ', url);
    }
  });

  page.on('response', (res) => {
    const url = res.url();
    const status = res.status();
    if (url.includes('/draco/') || url.includes('draco_decoder') || url.includes('draco_wasm_wrapper')) {
      console.log('DRACO_RES', status, url);
    }
    if (url.includes('.glb')) console.log('GLB_RES', status, url);
    if ((url.includes('.glb') || url.includes('/draco/')) && status >= 400) {
      console.log('BAD_RES', status, url);
    }
  });

  let overlayVisible = false;
  let windowDiag = [];
  let didTimeout = false;

  const run = async () => {
    console.log('DIAG_STEP_GOTO');
    await page.goto('http://localhost:3000/konfiguratorius3d', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    console.log('DIAG_LOADED');

    // Wait for configurator controls to hydrate/render.
    try {
      await page.getByRole('button', { name: 'Fasadinė' }).first().waitFor({ timeout: 15_000 });
    } catch {}

    const waitForEnabled = async (name, timeoutMs = 20_000) => {
      const start = Date.now();
      const button = page.getByRole('button', { name }).first();
      while (Date.now() - start < timeoutMs) {
        const count = await button.count().catch(() => 0);
        if (count) {
          const enabled = await button.isEnabled().catch(() => false);
          if (enabled) return true;
        }
        await page.waitForTimeout(250);
      }
      return false;
    };

    const clickByName = async (name) => {
      const button = page.getByRole('button', { name }).first();
      const count = await button.count().catch(() => 0);
      console.log('BTN', name, 'count', count);
      if (!count) return;

      const enabled = await button.isEnabled().catch(() => false);
      console.log('BTN', name, 'enabled', enabled);
      if (!enabled) return;

      try {
        await button.scrollIntoViewIfNeeded().catch(() => {});
        await button.click({ timeout: 5_000, force: true });
        console.log('BTN', name, 'clicked');
      } catch (e) {
        console.log('BTN', name, 'click_failed');
      }
    };

    const clickMany = async (names) => {
      for (const name of names) {
        await clickByName(name);
        await page.waitForTimeout(400);
      }
    };

    console.log('DIAG_STEP_INTERACT');
    // Facade thermo: cycle profiles + colors.
    await waitForEnabled('Fasadinė');
    await clickByName('Fasadinė');
    await page.waitForTimeout(600);
    await waitForEnabled('Termo');
    await clickByName('Termo');
    await page.waitForTimeout(800);
    await clickMany(['Pusė špunto', 'Pusė špunto 45°', 'Rombas']);
    await clickMany(['Juoda', 'Anglis', 'Šviesi anglis', 'Grafitas', 'Tamsiai ruda', 'Sidabrinė']);

    // Terrace thermo: should use rectangle profile + same colors.
    await clickByName('Terasinė');
    await page.waitForTimeout(600);
    await clickByName('Termo');
    await page.waitForTimeout(800);
    await clickMany(['Juoda', 'Anglis', 'Šviesi anglis', 'Grafitas', 'Tamsiai ruda', 'Sidabrinė']);

    await page.waitForTimeout(2_000);

    console.log('DIAG_STEP_OVERLAY');
    const overlayLocator = page.getByText('Kraunamas 3D modelis', { exact: false }).first();
    overlayVisible = (await overlayLocator.count().catch(() => 0)) > 0 &&
      (await overlayLocator.isVisible().catch(() => false));
    console.log('OVERLAY_VISIBLE', overlayVisible);

    console.log('DIAG_STEP_SCREENSHOT');
    await page.screenshot({ path: 'tmp-runtime-diag.png', fullPage: false });

    console.log('DIAG_STEP_WINDOW_DIAG');
    windowDiag = await page.evaluate(() => window.__diag || []);
    console.log('DIAG_COUNT', windowDiag.length);
  };

  const runPromise = run();
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      didTimeout = true;
      reject(new Error(`DIAG_TIMEOUT ${OVERALL_TIMEOUT_MS}ms`));
    }, OVERALL_TIMEOUT_MS)
  );

  try {
    await Promise.race([runPromise, timeoutPromise]);
  } catch (error) {
    console.error('DIAG_ERR', error && error.stack ? error.stack : error);
  } finally {
    await browser.close();
    await runPromise.catch(() => {});
  }

  if (windowDiag.length) {
    console.log('DIAG_FIRST', JSON.stringify(windowDiag.slice(0, 5), null, 2));
  }

  if (diag.requestFailed.length) {
    console.log('REQ_FAIL_COUNT', diag.requestFailed.length);
  }

  if (diag.pageErrors.length) {
    console.log('PAGE_ERR_COUNT', diag.pageErrors.length);
  }

  if (diag.consoleErrors.length) {
    console.log('CONSOLE_ERR_COUNT', diag.consoleErrors.length);
  }

  if (diag.gstaticRequests.length) {
    console.log('GSTATIC_COUNT', diag.gstaticRequests.length);
    console.log('GSTATIC_FIRST', diag.gstaticRequests[0]);
  }

  console.log('DIAG_DONE');

  // Only treat 3D-related request failures as a failure signal.
  const importantRequestFails = diag.requestFailed.filter((e) => {
    const url = (e.url || '').toLowerCase();
    if (url.includes('/api/pricing/quote')) return false;
    return url.includes('.glb') || url.includes('/draco/') || url.includes('draco_decoder') || url.includes('draco_wasm_wrapper');
  });

  // Flag likely CSP worker issues explicitly.
  const hasCspWorkerError = diag.consoleErrors.some((e) => {
    const text = (e.text || '').toLowerCase();
    return (
      text.includes('content security policy') &&
      text.includes('worker') &&
      (text.includes('blob:') || text.includes('blob'))
    );
  });

  const failed =
    windowDiag.length > 0 ||
    importantRequestFails.length > 0 ||
    diag.pageErrors.length > 0 ||
    hasCspWorkerError ||
    diag.consoleErrors.some((e) => (e.text || '').toLowerCase().includes('failed to fetch'));

  if (didTimeout) process.exit(3);
  process.exit(failed ? 2 : 0);
})().catch((error) => {
  console.error('DIAG_ERR', error && error.stack ? error.stack : error);
  process.exit(1);
});
