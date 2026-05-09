# Doctor Now

A cross‑platform healthcare booking and communication app built with **Expo / React Native**. Patients discover doctors, book and manage appointments, chat in real time, and leave ratings and reviews—while doctors manage profiles, schedules, billing plans, and conversations. Administrators onboard doctors and oversee operations via a dedicated workflow.

---

## Features

- **Multi‑role experiences** — Unauthenticated onboarding; **patient**, **doctor**, and **admin** flows selected from server‑provided flags (`is_admin`, `is_doctor`).
- **Doctor discovery & profiles** — Browse doctors, favourites, clinic details, working hours, and profile content.
- **Appointments** — Create, update, view, and remove appointments; history for patients and doctors; admin‑visible appointment listings.
- **Maps & location** — Map screens and coordinated selection (including admin tooling) with location updates pushed to the API.
- **Favourites** — Add/remove and query favourite doctors per user.
- **Reviews & ratings** — Submit and fetch reviews and rating aggregates tied to doctors.
- **Real‑time messaging** — User and doctor chats backed by **Cloud Firestore** (`chats` collection) with **`onSnapshot`** listeners.
- **Media** — Firebase **Cloud Storage** used for uploads (for example avatar / chat photo flows referenced in UI modules).
- **Doctor billing / plans** — Tiered pricing (basic / premium / enterprise caps in UI) with payment submission to a **`/API/Credits/pay.php`** endpoint (card fields sent to backend—treat as integration with your PCI‑compliant service).
- **Scheduling utilities** — Client‑side helpers for generating time slots (e.g. `database/getTimeList.js`) combined with doctor schedule API calls.

---

## Tech Stack

Evidence is taken from `package.json`, `babel.config.js`, `app.json`, and source imports.

### Application

| Layer | Technology |
|--------|------------|
| Runtime / framework | **Expo SDK ~48**, **React 18**, **React Native 0.71** |
| Web (optional target) | **react-native-web**, **react-dom**, **@expo/webpack-config** |
| Navigation | **@react-navigation/stack**, **@react-navigation/bottom-tabs**, **NavigationContainer** |
| Networking | **axios**, **fetch** |
| Backend integration | **Hosted PHP REST API** (base URL configured in code; JSON bodies where used) |

### Firebase (JavaScript SDK / modular API)

Per `db/Config.js` and imports in chat / appointment / upload screens:

| Product | Usage in codebase |
|---------|-------------------|
| **Firebase App** | `initializeApp` |
| **Cloud Firestore** | Chat threads and related document access (`firebase/firestore`) |
| **Cloud Storage** | File uploads (`firebase/storage`) |

`firebase/auth` is imported (`getAuth` in config module; `signOut` in chat UI). Application **login / signup / session restore** are implemented against the **PHP** auth endpoints (`database/Users.js`), not Firebase Authentication email/password flows visible in sources.

### UI & device

**react-native-paper**, **react-native-elements**, **@expo/vector-icons**, **react-native-vector-icons**, **react-native-svg**, **react-native-flip-card**, **@react-native-community/datetimepicker**, **@react-native-picker/picker**, **@react-native-community/blur**, **react-native-dropdown-select-list**, emoji picker packages, **react-native-image-picker**, **expo-image-picker**, **react-native-image-zoom-viewer**, **react-native-gifted-chat**, **react-native-maps**, **react-native-open-maps**, **expo-location**, **expo-font**, **expo-status-bar**.

### Declared but not referenced in tracked JS/JSX sources

Some dependencies appear on **npm** lists only (no `import`/`require` hits in `.js`/`.jsx` under this repo): for example **`@stripe/stripe-react-native`**, **`@react-native-firebase/app`**, **`react-native-blurhash`**—included for future/native wiring or leftovers; integration should be verified before claiming those features.

### Tooling & build

**Babel** (`babel-preset-expo`), **EAS CLI** profiles in `eas.json` (development, preview, production, Android APK flavour), **`sharp-cli`** dev dependency.

---

## Architecture Overview

```
Doctor_Now/
├── App.js                 # Root shell; wraps app in React context provider
├── Main.js                # Loads current user & doctors; switches navigators by role
├── app.json               # Expo app metadata & EAS project id
├── eas.json               # EAS Build / submit profiles
├── babel.config.js
├── db/
│   └── Config.js          # Firebase web SDK initialization & Firestore handle
├── database/              # API client layer toward PHP backend + helpers
│   ├── Ip.js             # Base URL for all HTTP APIs
│   ├── Users.js          # Auth, favourites, appointments, reviews, ratings, history…
│   ├── Doctors.js        # Doctor CRUD, schedules, geo updates
│   ├── Payment.js        # Payment POST wrapper
│   └── getTimeList.js    # Time-slot generation helper
└── components/
    ├── navigation/
    │   └── StackNavigator.js   # Patient tabs + stacks; admin & doctor stacks
    ├── consts/               # React Context (global UI/data), static assets config
    ├── screens/               # Patient-oriented screens (home, auth, bookings, chat list…)
    ├── Doctor_Page/           # Doctor dashboard (info, shifts, payments, chat_D, map…)
    ├── admin/                 # Admin home, add doctor, appointments, map select
    └── subcomponents/          # Cards, editors, chatbox, histories, detail panels
```

**Data flow**

1. **PHP API** (`database/Ip.js` base URL) stores authoritative user, doctor, appointment, favourites, reviews, credits, etc.
2. **Firebase** complements with **Firestore** for chat synchronization and **Storage** for binary assets.
3. **`AppProvider` / `AppContext`** centralizes client state (favourites, doctors list, schedules, appointments, comments, themes, etc.).
4. **`Main.js`** gatekeeps navigators once `getCurrentUser()` resolves.

---

## Installation & Setup

### Prerequisites

- **Node.js** (LTS recommended) and **npm**
- **Expo CLI** / **npx** (Expo 48 toolchain)
- For device builds: **EAS CLI** if using `eas.json` profiles
- Firebase project matching `db/Config.js` (or replace with yours)
- PHP API deployed and reachable (see Configuration)

### Steps

```bash
git clone <your-repo-url>
cd Doctor_Now
npm install
npm start          # expo dev server — then press i / a / w for emulator or web
```

Other scripts (`package.json`):

- `npm run android`
- `npm run ios`
- `npm run web`

---

## Configuration & Environment Variables

This repository **does not** use a `.env` file today. Sensitive and environment‑specific values are **hard-coded**:

| What | Where to change |
|------|----------------|
| Firebase web config | `db/Config.js` (`firebaseConfig`; includes keys and project identifiers) |
| REST API origin | `database/Ip.js` (`https://doctornow20.000webhostapp.com` in source) |

**Recommended hardening**

- Move Firebase config and API base URL into **Expo public env vars** (`app.config.js` + `extra`) or **`EXPO_PUBLIC_*`** and read at build time—**never** commit production secrets to public repos.
- Rotate any keys that were already committed publicly.
- For payments, align with PCI guidance (avoid raw card handling in clients where possible).

---

## API Overview (PHP Backend)

The mobile app talks to **JSON‑oriented PHP scripts** rooted at **`{BASE_URL}/API/...`** where `{BASE_URL}` is the value exported from `database/Ip.js`.

Representative endpoints referenced in **`database/Users.js`** and **`database/Doctors.js`** (not exhaustive):

| Area | Method & path pattern |
|------|-------------------------|
| **Auth** | `POST …/Auth/Signup.php`, `POST …/Auth/Login.php`, `GET …/Auth/Logout.php`, `GET …/Auth/Getuser.php` |
| **Users** | `POST …/users/edit.php`, `POST …/users/get_user_by_Id.php` |
| **Favourites** | `POST …/favorate/*.php` (get, membership check, insert, delete) |
| **Doctors** | `GET …/doctors/select.php`; `POST …/doctors/*` including insert, delete, get by id, update location/details, schedules |
| **Appointments & history** | `POST …/doctors/` scripts for insert, delete, lists, history filtered by doctor/user/date/phone |
| **Reviews** | `POST …/reviews/update_rev.php`, `get_rev.php`, `insert_rev.php`, `update_doctor.php` |
| **Ratings** | `POST …/rate/get_rate.php`, `insert_rate.php` |
| **Credits / payment** | `POST …/API/Credits/pay.php` |

The **PHP implementations and relational schema are not included** in this frontend repository—deploy and document them separately.

---

## Database & Firebase

### Firestore & Storage

- **Firestore**: documents under collection **`chats`** (queries and live listeners appear in screens such as **`components/screens/Chat.jsx`**).
- **Storage**: uploads using **`firebase/storage`** (e.g. doctor profile / chat photo components).

### Server‑side datastore

Appointment, user profile, favourites, ratings, credits, etc. are mediated by **HTTP calls to PHP**; the underlying engine (**MySQL**/MariaDB/etc.) is **not defined in this codebase**.

---

## Authentication & Payments

- **Sessions / identities** flow through **`/API/Auth/*`** plus **`Getuser.php`** for restoring the signed‑in profile. Role flags drive UI (`is_admin`, `is_doctor`).
- **Firebase Auth**: SDK pieces are present (`signOut` import exists in chat UI), but credentials for app login originate from the PHP API in the audited sources.
- **Payments**: Stripe’s React Native SDK is **`package.json`‑declared only**—the implemented path uses **`database/Payment.js`** → **`/API/Credits/pay.php`** with card‑like fields forwarded to your backend.

---

## Performance & UX Notes

- **Firestore `onSnapshot`** keeps chat interfaces updated without polling.
- **`AppContext`** consolidates frequent UI state while **`Main.js`** primes doctor lists early on launch.
- Image and chat SDKs (**Gifted Chat**, zoom viewer, pickers)** support richer media UX; quantify performance only after profiling on target hardware.

---

## License & Ownership

Refer to repository settings or add a **`LICENSE`** file if one is adopted. **`app.json`** lists Expo `owner` metadata for organizational context.
