# Blender: eksportuoti GLB variantus pagal spalvą

Šitas repo turi per-spalvą „finish“ paveikslus (pvz. `public/assets/finishes/larch/...`), bet dabartiniai GLB modeliai yra bendri visoms spalvoms.

Kad 3D modelyje spalvos persijungtų kaip Blender, patogiausia turėti po vieną GLB kiekvienai spalvai.

## 1) Reikalavimai

- Įdiegtas Blender (CLI `blender` pasiekiamas iš terminalo), arba naudok pilną kelią iki `blender.exe`.
- Turi `.blend` failą su modeliu (pvz. terasa/fasadas) ir teisingai sukonfigūruotomis medžiagomis.

## 2) Paleidimas (Windows PowerShell)

Komanda (pavyzdys maumedžiui/terasai):

```powershell
blender --background C:\kelias\iki\scene.blend --python scripts/blender/export_color_variants.py -- `
  --wood larch --model terrace --outputDir public/models/products `
  --texturesDir public/assets/finishes/larch
```

Eglei:

```powershell
blender --background C:\kelias\iki\scene.blend --python scripts/blender/export_color_variants.py -- `
  --wood spruce --model terrace --outputDir public/models/products `
  --texturesDir public/assets/finishes/spruce
```

## 3) WEBP pastaba

Jei tekstūros yra `.webp`, Blender eksportas gali įdėti `EXT_texture_webp` į GLB.
Naršyklėse tai kartais sukelia problemas (priklausomai nuo loaderio / CSP / fallback).

Repo turi post-processing skriptą, kuris konvertuoja GLB viduje esančias WEBP į PNG ir pašalina `EXT_texture_webp`:

```powershell
# Konvertuoti vieną failą (sukuria .png.glb kopiją)
node scripts/convert-glb-webp-to-png.mjs public/models/products/larch-terrace-carbon.glb

# Perrašyti originalą vietoje
node scripts/convert-glb-webp-to-png.mjs --overwrite public/models/products/larch-terrace-carbon.glb

# Batch: konvertuoti kelis failus iš karto
node scripts/convert-glb-webp-to-png.mjs --overwrite public/models/products/*.glb
```

## 4) Toliau

Kai GLB variantai jau sukurti, galima:

- atnaujinti `public/models/products/index.json`, kad kiekviena spalva rodytų savo GLB,
- arba palikti vieną GLB ir perjunginėti tekstūras kode (jei GLB turi visus reikalingus map’us ir UV kanalus).

## 5) Ką verta įkelti į repo pagal pagrindimo dokumentą

Jei tikslas - kad `readmenew.md` būtų pagrįstas ne tik galutiniais `.glb`, bet ir tarpiniais Blender/PBR artefaktais, verta laikyti tokį minimalų, bet pakankamą binarinį rinkinį:

- 4 Blender šaltinių failus po `blender/source/`:
  `terrace-rectangular.blend`, `facade-rhombus.blend`, `facade-half-tongue.blend`, `facade-half-tongue-45.blend`.
- 3 archyvus su žaliomis tekstūrų fotografijomis po `tmp/evidence/raw-textures/`:
  `larch-raw-photos.zip`, `spruce-raw-photos.zip`, `thermo-raw-photos.zip`.
- 3 archyvus su PBR žemėlapių rinkiniais po `tmp/evidence/blender-pbr/`:
  `larch-pbr-maps.zip`, `spruce-pbr-maps.zip`, `thermo-pbr-maps.zip`.
- Kiekviename PBR archyve laikyti bent spalvų aplankus su 4 failais kiekvienai spalvai:
  `baseColor`, `roughness`, `normal`, `displacement`.
- 4-8 reprezentatyvius Blender renderius po `tmp/evidence/blender-renders/`, pvz.:
  `larch-rhombus-carbon.png`, `spruce-half-tongue-latte.png`, `spruce-half-tongue-45-graphite.png`, `thermo-rhombus-black.png`.

Šiuo metu repo jau turi tai, ko nereikia dubliuoti:

- galutinius modelius po `public/models/products/`,
- galutinius finish paveikslus po `public/assets/finishes/`,
- vertinimo ekrano kopijas po `public/assets/evaluator/14.2/`.

Jei dydis svarbus, `.blend` ir PBR rinkinius geriau laikyti per Git LFS arba sudėti į `tmp/evidence/` kaip archyvus, o ne išskleisti šimtus pavienių failų į `public/`.
