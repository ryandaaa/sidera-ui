# Sidera UI

Starter kit & fondasi UI Kit kustom yang dibangun dengan **React 19**, **TypeScript**, dan **Tailwind CSS v4**, siap di-deploy langsung ke **Cloudflare Workers**.

---

## 🌟 Fitur Utama

- ⚡ **Vite 8 + React 19 + TypeScript**: Build super cepat dan modern.
- 🎨 **Tailwind CSS v4**: Zero-configuration CSS engine terbaru.
- 🧩 **Starter UI Components**:
  - `Button` (dengan varian warna, ukuran, dan loading spinner)
  - `Badge` (indikator status dengan varian tema semantik)
  - `Card` (struktur modular: Header, Title, Description, Content, Footer)
  - `Input` (lengkap dengan label, error message, dan helper text)
- ☁️ **Cloudflare Workers Ready**: Menggunakan Workers Static Assets via `wrangler.jsonc`.
- 💾 **Hemat Disk C:**: Dikonfigurasi dengan `pnpm` yang menyimpan cache/store langsung di drive `D:\.pnpm-store` (tidak membebani partisi OS Windows C:).
- 🔍 **Oxlint**: Linter super cepat berbasis Rust.

---

## 📁 Struktur Direktori

```text
sidera-ui/
├── .npmrc                   # Konfigurasi store pnpm di drive D:
├── wrangler.jsonc           # Konfigurasi deploy Cloudflare Workers Static Assets
├── vite.config.ts           # Konfigurasi Vite & Tailwind v4 plugin
├── tsconfig.app.json        # Path alias @/* -> ./src/*
├── src/
│   ├── components/
│   │   └── ui/              # Tempat komponen UI Kit kamu
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── index.ts     # Central export
│   ├── lib/
│   │   └── utils.ts         # Helper cn() (clsx + tailwind-merge)
│   ├── App.tsx              # Halaman showcase / dokumentasi UI Kit
│   ├── main.tsx             # Entry point React
│   └── index.css            # Import Tailwind CSS v4 & tema dasar
└── package.json
```

---

## 🚀 Panduan Menjalankan

### 1. Jalankan Mode Development (Lokal)

```bash
pnpm dev
```

Buka URL lokal yang muncul (default: `http://localhost:5173`).

### 2. Jalankan Type Check & Lint

```bash
pnpm lint
```

### 3. Build untuk Production

```bash
pnpm build
```

Hasil build akan otomatis masuk ke folder `dist/`.

---

## ☁️ Deploy ke Cloudflare Workers

1. **Login ke Cloudflare** (cukup sekali):
   ```bash
   pnpm wrangler login
   ```

2. **Deploy aplikasi & showcase UI Kit**:
   ```bash
   pnpm deploy
   ```

3. **Simulasi lokal Cloudflare Worker**:
   ```bash
   pnpm worker:dev
   ```

---

## 💡 Menambah Komponen UI Baru

Cukup buat file baru di dalam `src/components/ui/`, misalnya `dialog.tsx`:

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Dialog(/* props */) {
  // return JSX
}
```

Lalu ekspor di `src/components/ui/index.ts`:

```ts
export * from './dialog'
```

Komponen langsung siap dipanggil di `App.tsx` atau diimport oleh project lain!
