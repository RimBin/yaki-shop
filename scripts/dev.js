const fs = require('node:fs');
const http = require('node:http');
const net = require('node:net');
const path = require('node:path');
const { spawn } = require('node:child_process');

function parsePort(args) {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '-p' || arg === '--port') {
      const next = args[i + 1];
      const port = Number(next);
      if (Number.isFinite(port) && port > 0) return port;
    }
    if (arg && arg.startsWith('--port=')) {
      const port = Number(arg.slice('--port='.length));
      if (Number.isFinite(port) && port > 0) return port;
    }
  }
  return 3000;
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const done = (result) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(400);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));

    socket.connect(port, '127.0.0.1');
  });
}

function isHttpResponsive(port) {
  return new Promise((resolve) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port,
        path: '/',
        method: 'GET',
        timeout: 800,
        headers: {
          // Keep it tiny; we just need *any* HTTP response.
          Accept: 'text/html',
        },
      },
      (res) => {
        res.resume();
        resolve(true);
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.on('error', () => resolve(false));
    req.end();
  });
}

async function main() {
  const userArgs = process.argv.slice(2);
  const port = parsePort(userArgs);
  const lockPath = path.join(process.cwd(), '.next', 'dev', 'lock');

  if (fs.existsSync(lockPath)) {
    const portOpen = await isPortOpen(port);
    if (portOpen) {
      const responsive = await isHttpResponsive(port);
      if (responsive) {
        console.log(`Next dev is already running: http://localhost:${port}`);
        console.log('Stop the running process (or run `npm run dev:unlock`) to restart.');
        return;
      }

      console.error(`Next dev appears to be running but is not responding: http://localhost:${port}`);
      console.error('The port is open but HTTP requests time out (stuck dev server).');
      console.error('Run `npm run dev:unlock` to stop it, then retry `npm run dev`.');
      process.exitCode = 1;
      return;
    }

    try {
      fs.unlinkSync(lockPath);
      console.log(`Removed stale Next dev lock: ${lockPath}`);
    } catch (error) {
      console.error(`Found Next dev lock but could not remove it: ${lockPath}`);
      console.error(String(error?.message || error));
      console.error('Another Next dev instance is likely running; stop it (or run `npm run dev:unlock`) and retry.');
      process.exitCode = 1;
      return;
    }
  }

  const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');
  if (!fs.existsSync(nextBin)) {
    console.error(`Next.js binary not found at ${nextBin}`);
    console.error('Run `npm install` first.');
    process.exitCode = 1;
    return;
  }

  // Turbopack can be flaky on Windows filesystems (SST/compaction errors).
  // Default to Webpack unless the user explicitly asked for Turbopack.
  const wantsTurbo = userArgs.includes('--turbo') || userArgs.includes('--turbopack');
  const wantsWebpack = userArgs.includes('--webpack');
  const nextArgs = ['dev', ...userArgs];

  if (!wantsTurbo && !wantsWebpack) {
    nextArgs.push('--webpack');
  }

  const child = spawn(process.execPath, [nextBin, ...nextArgs], { stdio: 'inherit', env: process.env });
  child.on('exit', (code) => process.exit(code ?? 0));
  child.on('error', (error) => {
    console.error(String(error?.message || error));
    process.exit(1);
  });
}

main().catch((error) => {
  console.error(String(error?.message || error));
  process.exit(1);
});

