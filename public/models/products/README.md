# Product 3D Models

Place per-product `.glb` files here. Each product can have its own model.

## Naming Convention

All per-product models live in `public/models/products/` and are registered via `index.json`.

Current convention (exported from Blender):

- Terrace (Staciakampis):
	- `spruce-terrace-rectangular-<color>.glb`
	- `larch-terrace-rectangular-<color>.glb`

- Facade:
	- `spruce-facade-rhombus-<color>.glb`
	- `spruce-facade-half-tenon-<color>.glb`
	- `spruce-facade-half-tenon-45-<color>.glb`
	- `larch-facade-rhombus-<color>.glb`
	- `larch-facade-half-tenon-<color>.glb`
	- `larch-facade-half-tenon-45-<color>.glb`

Where `<color>` is one of:
`natural`, `black`, `carbon`, `carbon-light`, `graphite`, `silver`, `latte`, `dark-brown`.

## Blender Export Settings

Export each product as **glTF Binary (.glb)** with:

- **Apply Modifiers**: ON
- **Export only selected**: Select only the specific product objects
- **Materials**: Use **one material** per mesh (Principled BSDF). The code will dynamically change `color`, `roughness`, and `metalness` based on user selection — no need for separate materials per color
- **Geometry**: Draco compression ON (smaller file size)
- **Transform**: +Y Up, -Z Forward (Three.js standard)
- **Target polycount**: ~50k triangles per model (mobile optimization)

## Material Setup in Blender

Each mesh should have a single **Principled BSDF** material. The website code traverses all meshes and applies:

- `material.color.set(hex)` — changes color based on user-selected swatch
- `material.roughness` — set from finish preset (matte: 0.86, semi: 0.62, gloss: 0.42)
- `material.metalness` — set from finish preset (matte: 0.04, semi: 0.08, gloss: 0.12)

So UV-mapping and base geometry are important, but material colors/roughness will be overridden at runtime.

## How It Works

The model registry is in `lib/models.ts`. It maps product slugs to GLB file paths.
When a product slug has no specific model, it falls back to `/models/configurator/model.glb` (generic model).
If no model file exists, the configurator shows a procedural 3D shape.
