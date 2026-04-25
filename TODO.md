# Car Rental + Admin Panel (AR/FR) - Implementation TODO

## Tech Stack: React + Vite + Tailwind CSS + Convex

### Step 1: Project Initialization
- [x] Initialize Vite React project
- [x] Install dependencies (Tailwind, React Router, Convex, Lucide React)
- [x] Configure Tailwind CSS

### Step 2: Convex Backend Setup
- [x] Create `convex/` directory with schema
- [x] Define tables: `cars`, `bookings`
- [x] Write Convex queries: `getCars`, `getBookings`, `getAnalytics`
- [x] Write Convex mutations: `addCar`, `updateCar`, `deleteCar`, `createBooking`

### Step 3: Internationalization (i18n)
- [x] Create `i18n/` directory with AR and FR dictionaries
- [x] Create `I18nProvider` context with language toggle
- [x] Implement RTL/LTR direction switching

### Step 4: Routing & Layout
- [x] Set up React Router with routes: `/`, `/admin`
- [x] Create `Layout` component with Navbar and Footer
- [x] Implement admin route protection (simple password gate)

### Step 5: Client-Side Pages
- [x] `HomePage`: Hero, fleet grid, booking modal
- [x] `CarCard` component with WhatsApp booking integration
- [x] Booking modal with date/location pickers

### Step 6: Admin Dashboard
- [x] `AdminPage` layout with password gate
- [x] Car management table (add/edit/delete)
- [x] Analytics cards (Total Cars, Active Bookings, Revenue)
- [x] Bookings overview table with status dropdown
- [x] Professional dashboard structure with sidebar-like sections

### Step 7: Convex Integration & Setup
- [x] Create `_generated/api.ts` stub for compilation
- [ ] Run `npx convex init` to initialize project
- [ ] Run `npx convex dev` to generate real types and start backend
- [ ] Update `.env` with real `VITE_CONVEX_URL`

### Step 8: Frontend Pages
- [x] `CarsPage`: dedicated /cars route with available-only filter
- [x] Category filter buttons on Cars page
- [x] Navbar links to Cars page

### Step 9: Polish & Testing
- [x] Apply Dark Blue / Slate / Gold color palette
- [x] Ensure responsive design
- [x] Verify WhatsApp redirect URL generation
- [x] Test AR/FR language switching

