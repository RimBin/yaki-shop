# Inventoriaus valdymo sistema

Pilna inventoriaus sekimo ir atsargų valdymo sistema Yakiwood e. parduotuvės platformai.

## Funkcionalumas

### Pagrindinės funkcijos
- **Atsargų sekimas realiu laiku** — turimos, rezervuotos ir parduotos prekės
- **Automatinės rezervacijos** — atsargos rezervuojamos atsiskaitymo metu, atleidžiamos atšaukus
- **Mažų atsargų pranešimai** — automatiniai pranešimai, kai atsargos pasiekia užsakymo tašką
- **Judėjimo istorija** — pilnas visų inventoriaus pokyčių audito sluoksnis
- **Kelių lokacijų palaikymas** — inventoriaus sekimas skirtingose sandėlio vietose
- **Administratoriaus skydelis** — pilna inventoriaus valdymo sąsaja su paieška, filtrais ir masinėmis operacijomis

### Integracijos taškai
- **Atsiskaitymo srautas** — automatinė atsargų validacija prieš mokėjimą
- **Stripe webhook** — atsargos rezervuojamos per atsiskaitymą, patvirtinamos gavus mokėjimą, atleidžiamos nesėkmės atveju
- **Produktų puslapiai** — atsargų indikatoriai (yra sandėlyje, mažai, nėra sandėlyje)
- **Administratoriaus pranešimai** — el. pašto pranešimai apie mažas ir pasibaigusias atsargas

## Duomenų bazės schema

Failas: [`supabase/migrations/005_inventory_management.sql`](../supabase/migrations/005_inventory_management.sql)

### Lentelės

#### `inventory_items`
Seka inventoriaus lygius produktams ir variantams.

| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| `id` | UUID | Pirminis raktas |
| `product_id` | UUID | Nuoroda į products lentelę |
| `variant_id` | UUID | Neprivaloma varianto nuoroda |
| `sku` | TEXT | Unikalus atsargų kodas |
| `quantity_available` | INT | Dabar turimos atsargos |
| `quantity_reserved` | INT | Rezervuotos laukiantiems užsakymams |
| `quantity_sold` | INT | Iš viso parduota (istorinis) |
| `reorder_point` | INT | Pranešimo riba (numatytoji: 10) |
| `reorder_quantity` | INT | Rekomenduojamas papildymo kiekis (numatytasis: 50) |
| `location` | TEXT | Sandėlio vieta |
| `last_restocked_at` | TIMESTAMPTZ | Paskutinio papildymo laikas |

#### `inventory_movements`
Registruoja visus inventoriaus pokyčius audito sekimui.

| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| `id` | UUID | Pirminis raktas |
| `inventory_item_id` | UUID | Nuoroda į inventoriaus elementą |
| `type` | TEXT | Judėjimo tipas (restock, sale, return, adjustment, reservation, release) |
| `quantity` | INT | Pokyčio kiekis (teigiamas/neigiamas) |
| `reason` | TEXT | Pokyčio priežastis |
| `reference_id` | UUID | Užsakymo ID ar kita nuoroda |
| `performed_by` | UUID | Veiksmą atlikęs naudotojas |
| `performed_at` | TIMESTAMPTZ | Laiko žyma |

#### `inventory_alerts`
Seka mažų atsargų ir pasibaigusių atsargų pranešimus.

| Stulpelis | Tipas | Aprašymas |
|-----------|-------|-----------|
| `id` | UUID | Pirminis raktas |
| `inventory_item_id` | UUID | Nuoroda į inventoriaus elementą |
| `alert_type` | TEXT | Pranešimo tipas (low_stock, out_of_stock, overstock) |
| `threshold` | INT | Pranešimo riba |
| `current_quantity` | INT | Kiekis kuriant pranešimą |
| `resolved_at` | TIMESTAMPTZ | Kada pranešimas buvo išspręstas |
| `resolved_by` | UUID | Pranešimą išsprendęs naudotojas |

### Trigeriai

- **`update_inventory_updated_at`** — automatiškai atnaujina `updated_at` laiko žymą
- **`check_inventory_alerts`** — automatiškai kuria pranešimus pasiekus ribas
- **Eilutės lygio saugumas (RLS)** — vieši gali peržiūrėti, administratoriai gali valdyti

## API maršrutai

### Inventoriaus valdymas

#### `GET /api/inventory`
Visų inventoriaus elementų sąrašas su filtrais.

**Užklausos parametrai:**
- `status` — filtruoti pagal būseną: `all`, `in_stock`, `low_stock`, `out_of_stock`
- `search` — ieškoti pagal SKU arba vietą
- `page` — puslapio numeris (numatytasis: 1)
- `limit` — elementų skaičius puslapyje (numatytasis: 50)

**Atsakymas:**
```json
{
  "items": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "pages": 2
  },
  "stats": {
    "total_items": 100,
    "in_stock": 85,
    "low_stock": 10,
    "out_of_stock": 5,
    "total_value": 0
  }
}
```

#### `POST /api/inventory`
Naujo inventoriaus elemento sukūrimas (tik administratoriams).

**Turinys:**
```json
{
  "product_id": "uuid",
  "variant_id": "uuid",
  "sku": "YAKI-001",
  "quantity_available": 100,
  "reorder_point": 10,
  "reorder_quantity": 50,
  "location": "Warehouse A"
}
```

#### `GET /api/inventory/[sku]`
Inventoriaus elemento detalės su judėjimo istorija.

**Atsakymas:**
```json
{
  "item": {...},
  "movements": [...]
}
```

#### `PUT /api/inventory/[sku]`
Inventoriaus nustatymų atnaujinimas (tik administratoriams).

**Turinys:**
```json
{
  "reorder_point": 15,
  "reorder_quantity": 75,
  "location": "Warehouse B"
}
```

#### `DELETE /api/inventory/[sku]`
Inventoriaus elemento pašalinimas (tik administratoriams).

### Operacijos

#### `POST /api/inventory/restock`
Inventoriaus papildymas.

**Turinys:**
```json
{
  "sku": "YAKI-001",
  "quantity": 50,
  "reason": "New shipment received",
  "location": "Warehouse A",
  "notes": "Shipment #12345"
}
```

#### `POST /api/inventory/adjust`
Inventoriaus koregavimas (pataisos, pažeidimai ir kt.).

**Turinys:**
```json
{
  "sku": "YAKI-001",
  "quantity": -5,
  "reason": "damaged",
  "notes": "Water damage during storage"
}
```

#### `GET /api/inventory/alerts`
Inventoriaus pranešimų gavimas.

**Užklausos parametrai:**
- `resolved` — įtraukti išspręstus pranešimus (numatytasis: false)

**Atsakymas:**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "inventory_item_id": "uuid",
      "alert_type": "low_stock",
      "threshold": 10,
      "current_quantity": 8,
      "created_at": "2025-01-01T10:00:00Z",
      "inventory_item": {
        "sku": "YAKI-001",
        "quantity_available": 8,
        "product": {
          "name": "Oak Plank",
          "slug": "oak-plank"
        }
      }
    }
  ]
}
```

## Administratoriaus sąsaja

### Inventoriaus skydelis
**Vieta:** `/admin/inventory`

**Funkcijos:**
- Statistikos apžvalga (viso elementų, sandėlyje, mažai, nėra sandėlyje)
- Paieška pagal SKU arba vietą
- Filtravimas pagal būseną
- Greitas papildymo modalas
- Koregavimo modalas
- Eksportas į CSV
- Atsargų lygiai realiu laiku
- Spalvomis koduoti būsenos ženkliukai
- Judėjimo istorijos patarimas

**Komponentai:**
- [`app/admin/inventory/page.tsx`](../app/admin/inventory/page.tsx) — pagrindinis skydelis
- [`components/admin/InventoryTable.tsx`](../components/admin/InventoryTable.tsx) — inventoriaus lentelė su rūšiavimu
- [`components/admin/RestockModal.tsx`](../components/admin/RestockModal.tsx) — papildymo forma
- [`components/admin/AdjustmentModal.tsx`](../components/admin/AdjustmentModal.tsx) — koregavimo forma

## Frontend komponentai

### Atsargų indikatorius
**Vieta:** `components/products/StockIndicator.tsx`

Atsargų būsenos rodymas produktų puslapiuose.

**Naudojimas:**
```tsx
import { StockIndicator, PreOrderBadge } from '@/components/products/StockIndicator';

// Atsargų indikatorius
<StockIndicator 
  quantity={product.stockQuantity} 
  threshold={product.reorderPoint}
  showQuantity={true}
  size="md"
/>

// Išankstinio užsakymo ženkliukas
<PreOrderBadge 
  availableDate="2025-06-01"
  size="md"
/>
```

**Variantai:**
- ✓ Yra sandėlyje (žalia)
- ⚠ Mažai atsargų (geltona)
- ✕ Nėra sandėlyje (raudona)
- ⏰ Išankstinis užsakymas (mėlyna)

## Verslo logika

### InventoryManager klasė
**Vieta:** [`lib/inventory/manager.ts`](../lib/inventory/manager.ts)

Pagrindinės inventoriaus operacijos:

```typescript
// Atsargų prieinamumo tikrinimas
const stockCheck = await InventoryManager.checkStock(productId, quantity);

// Atsargų rezervavimas užsakymui (prieš mokėjimą)
await InventoryManager.reserveStock(items, orderId);

// Rezervuotų atsargų atleidimas (mokėjimas nepavyko/atšauktas)
await InventoryManager.releaseStock(orderId);

// Pardavimo patvirtinimas (mokėjimas sėkmingas)
await InventoryManager.confirmSale(orderId);

// Elemento papildymas
await InventoryManager.restockItem({
  sku: 'YAKI-001',
  quantity: 50,
  reason: 'New shipment',
  location: 'Warehouse A'
}, userId);

// Inventoriaus koregavimas
await InventoryManager.adjustInventory({
  sku: 'YAKI-001',
  quantity: -5,
  reason: 'damaged'
}, userId);

// Mažų atsargų pranešimų gavimas
const alerts = await InventoryManager.getLowStockAlerts();

// Atsargų lygio gavimas
const quantity = await InventoryManager.getStockLevel(productId);
```

### Krepšelio atsargų validacija
**Vieta:** [`lib/cart/stock-validation.ts`](../lib/cart/stock-validation.ts)

Krepšelio elementų validavimas prieš atsiskaitymą:

```typescript
import { validateCartStock, checkProductStock, adjustCartToStock } from '@/lib/cart/stock-validation';

// Viso krepšelio validacija
const validation = await validateCartStock(cartItems);
if (!validation.valid) {
  console.error('Atsargų klaidos:', validation.errors);
  console.warn('Įspėjimai:', validation.warnings);
}

// Vieno produkto tikrinimas
const stock = await checkProductStock(productId, quantity);
if (!stock.available) {
  alert(stock.message); // "Nėra sandėlyje" arba "Liko tik 5"
}

// Automatinis krepšelio pritaikymas prie turimų atsargų
const { adjustedItems, removedItems, adjustments } = await adjustCartToStock(cartItems);
```

## Atsiskaitymo srauto integracija

### Užsakymo procesas

1. **Krepšelio validacija** — atsargų prieinamumo tikrinimas prieš atsiskaitymą
2. **Atsiskaitymas pradėtas** — Stripe atsiskaitymo sesijos sukūrimas
3. **Mokėjimo patvirtinimas** — gavus `checkout.session.completed` webhook
4. **Atsargų atnaujinimas** — rezervavimas + pardavimo patvirtinimas

### Webhook apdorotojas
**Pagrindinis failas:** [`app/api/webhooks/stripe/route.ts`](../app/api/webhooks/stripe/route.ts)

**Bendra implementacija:** [`lib/stripe/webhook.ts`](../lib/stripe/webhook.ts)

**Senesnis nukreipimas (atgalinis suderinamumas):** [`app/api/webhook/route.ts`](../app/api/webhook/route.ts)

**Kiti mokėjimo tiekėjai (inventoriaus užbaigimas):**
- Paysera callback: [`app/api/webhooks/paysera/route.ts`](../app/api/webhooks/paysera/route.ts)
- PayPal capture: [`app/api/paypal/capture/route.ts`](../app/api/paypal/capture/route.ts)

**Bendra pagalbinė funkcija:** [`lib/inventory/finalize-paid-order.ts`](../lib/inventory/finalize-paid-order.ts)

**Įvykiai:**
- `checkout.session.completed` → užsakymas apmokėtas + sąskaita/el. laiškas + inventoriaus rezervavimas/patvirtinimas

## Pranešimai

### Administratoriaus pranešimai
**Vieta:** [`lib/notifications/inventory.ts`](../lib/notifications/inventory.ts)

Automatiniai el. pašto pranešimai:
- Mažų atsargų pranešimai (kai kiekis ≤ papildymo taškas)
- Pasibaigusių atsargų pranešimai (kai kiekis = 0)
- Papildymo rekomendacijos
- Inventoriaus koregavimai

> **Pastaba:** El. pašto siuntimo funkcija (`sendEmail`) šiuo metu yra TODO stadijoje — pranešimai registruojami konsolėje, bet faktiniai el. laiškai nėra siunčiami. Norint įjungti tikrą el. pašto siuntimą, reikia integruoti su Resend ar kitu el. pašto tiekėju.

**Naudojimas:**
```typescript
import { 
  notifyLowStock, 
  notifyOutOfStock, 
  notifyRestockNeeded 
} from '@/lib/notifications/inventory';

// Mažų atsargų pranešimas
await notifyLowStock(inventoryItem);

// Pasibaigusių atsargų pranešimas
await notifyOutOfStock(inventoryItem);

// Papildymo rekomendacija
await notifyRestockNeeded(inventoryItem);
```

## Nustatymo instrukcijos

### 1. Migracijos paleidimas

```bash
# Taikykite migraciją savo Supabase duomenų bazei
supabase db push

# Arba rankiniu būdu paleiskite migracijos failą
psql $DATABASE_URL < supabase/migrations/005_inventory_management.sql
```

### 2. Pradinių inventoriaus elementų sukūrimas

```sql
-- Pavyzdys: inventoriaus sukūrimas esamiems produktams
INSERT INTO inventory_items (product_id, sku, quantity_available, reorder_point, reorder_quantity, location)
SELECT 
  id,
  CONCAT(UPPER(slug), '-DEFAULT'),
  50, -- Pradinis kiekis
  10, -- Papildymo taškas
  50, -- Papildymo kiekis
  'Warehouse A'
FROM products;
```

### 3. Administratoriaus prieigos konfigūracija

Įsitikinkite, kad administratoriaus naudotojai turi teisingą rolę metaduomenyse:

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'
WHERE email = 'admin@yakiwood.com';
```

### 4. Sistemos testavimas

1. Atidarykite administratoriaus skydelį: `/admin/inventory`
2. Sukurkite testinį inventoriaus elementą
3. Testuokite papildymo operaciją
4. Testuokite koregavimo operaciją
5. Patikrinkite pranešimų puslapį
6. Testuokite atsiskaitymo srautą su atsargų validacija

## Geroji praktika

### SKU formatas
Naudokite nuoseklią SKU pavadinimų konvenciją:
```
[PRODUKTAS]-[VARIANTAS]-[SPALVA]
YAKI-PLANK-NATURAL
YAKI-PANEL-BLACK
```

### Papildymo taškai
Nustatykite papildymo taškus remiantis:
- Vidutiniu dienos pardavimu
- Papildymo pristatymo laiku
- Saugumo atsargų buferiu

Pavyzdys: 5 pardavimai/dieną × 7 dienų pristatymas = 35 papildymo taškas

### Atsargų rezervacijos
- Rezervacijos baigia galioti po 24 valandų (Stripe atsiskaitymo sesija)
- Visada atlaisvinkite atsargas nesėkmingo mokėjimo atveju
- Patvirtinkite pardavimą tik po sėkmingo mokėjimo

### Judėjimų registravimas
Visada registruokite judėjimus nurodydami:
- Aiškią priežastį
- Nuorodos ID (užsakymo ID, koregavimo priežastis)
- Kas atliko (naudotojo ID)
- Pastabas kontekstui

### Pranešimų valdymas
- Išspręskite pranešimus, kai atsargos papildytos
- Kasdien peržiūrėkite neišspręstus pranešimus
- Nustatykite el. pašto pranešimus kritiniams atvejams

## Trikčių šalinimas

### Atsargos neatnaujinamos
1. Patikrinkite Supabase RLS politikas (administratoriai turėtų turėti pilną prieigą)
2. Patvirtinkite, kad webhook gauna įvykius
3. Patikrinkite serverio žurnalus dėl klaidų
4. Įsitikinkite, kad SKU formatas sutampa tarp krepšelio ir inventoriaus

### Pranešimai nesuveikia
1. Patvirtinkite, kad trigeris įjungtas: `check_inventory_alerts`
2. Patikrinkite pranešimo ribos nustatymus
3. Peržiūrėkite duomenų bazės trigerių žurnalus
4. Įsitikinkite, kad RLS politikos leidžia kurti pranešimus

### Rezervacijos neveikia
1. Patikrinkite, ar webhook apdorotojas apdoroja `checkout.session.completed`
2. Patvirtinkite, kad krepšelio elementai turi teisingus produktų ID
3. Patikrinkite inventory_movements lentelę dėl rezervacijos įrašų
4. Įsitikinkite, kad pakankamas atsargų kiekis

### Administratoriaus skydelis nekraunamas
1. Patvirtinkite, kad naudotojas turi `role: 'admin'` metaduomenyse
2. Patikrinkite API maršrutų leidimus
3. Peržiūrėkite naršyklės konsolę dėl klaidų
4. Įsitikinkite, kad Supabase ryšys aktyvus

## Ateities patobulinimai

### Planuojamos funkcijos
- [ ] Inventoriaus prognozavimas (numatymas, kada papildyti)
- [ ] Kelių sandėlių valdymas
- [ ] Perkėlimo užsakymai tarp lokacijų
- [ ] Partijų/lotų sekimas
- [ ] Galiojimo datos sekimas (laiku jautriems produktams)
- [ ] Brūkšninių kodų skanavimo integracija
- [ ] Automatizuoti pirkimo užsakymai
- [ ] Inventoriaus vertinimas (FIFO/LIFO)
- [ ] Inventorizacija/ciklinis skaičiavimas
- [ ] Integracija su siuntų tiekėjais

### Optimizavimo galimybės
- [ ] Redis talpykla atsargų lygiams
- [ ] Masinių operacijų API galutiniai taškai
- [ ] GraphQL API sudėtingoms užklausoms
- [ ] WebSocket atnaujinimai realiu laiku
- [ ] Mobili programa sandėlio darbuotojams
- [ ] Išplėstinės analitikos skydelis

---

**Versija:** 1.0.0
**Būsena:** ✅ Paruošta produkcijai
