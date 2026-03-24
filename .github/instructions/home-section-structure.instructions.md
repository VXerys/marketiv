---
description: "Use when slicing or refactoring home landing sections into the workspace best-practice structure (co-located section modules, GSAP animation files, data contracts, and barrel exports)."
applyTo: "src/app/(home)/_sections/**/*.{ts,tsx}"
---
# Home Section Structure Standards

## Scope
- Berlaku untuk section private landing page home di src/app/(home)/_sections.
- Folder src/components/sections dipakai hanya untuk section reusable lintas route.

## Struktur Wajib Per Section
- Setiap section harus berada di folder sendiri, contoh: hero, fear, creator, umkm, runway, footer.
- Minimal isi folder section:
  - marketiv-*.tsx sebagai komponen utama section
  - *.animations.ts untuk timeline/ScrollTrigger logic
  - *.data.ts untuk static content + contracts lokal
  - index.ts sebagai barrel export section
- Subcomponent lokal (ikon, badge, cards) diletakkan di folder section yang sama jika tidak dipakai lintas route.

## Kontrak Komponen
- Gunakan Server Component sebagai default.
- Gunakan use client hanya pada leaf component yang butuh browser APIs atau GSAP.
- Komponen section mengikuti named export (bukan default export) untuk konsistensi.

## Kontrak Animasi
- File *.animations.ts harus berisi pure function, tanpa React hooks.
- React hooks seperti useGSAP hanya boleh di file .tsx.
- Import GSAP wajib dari util terpusat: @/lib/gsap.
- Gunakan selector yang scoped per section dan markers: false sebagai default.

## Kontrak Data
- File *.data.ts berisi constants, interface, atau type khusus section.
- Hindari side effects dan business logic kompleks di *.data.ts.
- Jika data/logic dipakai lintas section atau route, pindahkan ke src/lib atau src/types sesuai kebutuhan.

## Import dan Export
- Di dalam section: import relatif ke file lokal (./marketiv-*.animations, ./marketiv-*.data).
- Dari luar section folder: import melalui barrel index.ts section atau index root _sections.
- Hindari import langsung lintas section ke file internal section lain.

## Anti-Patterns (Forbidden)
- Menyatukan render, data, dan animasi kompleks dalam satu file monolitik.
- Menduplikasi registrasi plugin GSAP di banyak section jika sudah ditangani util terpusat.
- Menaruh use client di page.tsx/layout.tsx hanya untuk menghidupkan animasi section.
- Mengimpor file internal section lain secara langsung (melewati barrel export).
