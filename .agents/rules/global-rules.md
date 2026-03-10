# Global Coding Rules — Awwwards Portfolio

Aturan wajib yang harus diikuti oleh AI Agent di seluruh proyek ini. Tidak ada pengecualian.

---

## 🏗️ Arsitektur & Konvensi

### Next.js App Router
- **Selalu prioritaskan Server Components.** Semua komponen adalah Server Component secara default.
- **`"use client"` hanya di ujung tree (leaf component).** Gunakan hanya pada komponen yang membutuhkan interaktivitas: animasi GSAP, React state (`useState`, `useEffect`), event handler (`onClick`, `onChange`), atau browser API (`window`, `document`).
- **Colocation pattern.** File yang hanya digunakan oleh satu route harus berada di dalam folder route tersebut, bukan di `components/`.
- **Metadata & SEO wajib.** Setiap `page.tsx` harus mengekspor `metadata` object atau `generateMetadata()` untuk SEO.
- **Loading & Error states.** Gunakan `loading.tsx` dan `error.tsx` di route yang melakukan data fetching.

### TypeScript
- **Strict mode selalu aktif.** Tidak boleh menggunakan `any` — gunakan `unknown` jika tipe belum diketahui.
- **Interface untuk props, Type untuk union/utility.** Konsisten di seluruh codebase.
- **Semua tipe shared di `src/types/`.** Jangan definisikan tipe di file komponen kecuali tipe tersebut lokal.

---

## 🎬 GSAP & Animasi

> **📱 Mobile Analogy:** Ini seperti aturan "selalu gunakan `AnimationController` di dalam `State` dengan `TickerProviderStateMixin` dan `dispose()`" di Flutter — mencegah memory leak.

### Rules
- **DILARANG KERAS menggunakan `useEffect` mentah untuk animasi.** Wajib menggunakan `useGSAP()` dari `@gsap/react`.
- **Setiap animasi harus memiliki `scope` ref.** Untuk membatasi query selector dan memastikan cleanup otomatis.
- **Gunakan `gsap.context()` di dalam `useGSAP()`.** Jangan pernah membuat timeline di luar context.
- **ScrollTrigger wajib di-register manual:**
  ```typescript
  import { useGSAP } from "@gsap/react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);
  ```

### Pattern Wajib
```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".element", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

---

## 🎨 Tailwind CSS

- **Gunakan utility classes, hindari inline-style.** Kecuali untuk nilai dinamis dari GSAP (transform, opacity animasi).
- **Warna dan spacing menggunakan design tokens** yang didefinisikan di `tailwind.config.ts`.
- **Responsive design wajib mobile-first:** `base → sm → md → lg → xl → 2xl`.
- **Gunakan `cn()` helper** (dari `src/lib/utils.ts`) untuk conditional classes, bukan template literal sembarangan.

---

## 🗄️ Supabase

- **Client dibuat di `src/lib/supabase/`.** Satu file untuk server client, satu untuk browser client.
- **Selalu gunakan typed queries** dari tipe yang di-generate oleh Supabase CLI (`src/types/supabase.ts`).
- **Row Level Security (RLS) selalu aktif.** Tidak boleh bypass RLS di client-side.

---

## 📡 GitHub GraphQL API

- **Client di `src/lib/graphql/`.** Gunakan `graphql-request` dengan typed queries.
- **Queries didefinisikan sebagai constants** di file terpisah, bukan inline string.
- **Selalu handle error** dengan try-catch dan fallback UI.

---

## 📂 File & Naming Conventions

| Jenis | Konvensi | Contoh |
|---|---|---|
| Komponen | PascalCase | `HeroSection.tsx` |
| Hook | camelCase + `use` prefix | `useScrollProgress.ts` |
| Utility | camelCase | `formatDate.ts` |
| Type file | camelCase | `project.ts` |
| Route page | `page.tsx` (Next.js convention) | `app/about/page.tsx` |
| CSS module | kebab-case | `hero-section.module.css` |
| Folder | kebab-case | `components/animations/` |

---

## 🚫 Anti-Patterns (DILARANG)

1. ❌ `useEffect` untuk animasi GSAP — gunakan `useGSAP()`
2. ❌ `"use client"` di layout atau page level — hanya di leaf component
3. ❌ `any` type — gunakan `unknown` atau definisikan tipe yang benar
4. ❌ Inline styles untuk warna/spacing — gunakan Tailwind
5. ❌ Fetch data di client component — gunakan Server Component atau Server Action
6. ❌ Import seluruh library GSAP — import hanya plugin yang dibutuhkan
