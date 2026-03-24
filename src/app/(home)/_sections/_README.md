# /app/(home)/_sections - Landing Sections

Private section modules untuk landing page home route.

Struktur per section:

- `marketiv-*.tsx` untuk komponen section utama
- `*.animations.ts` untuk GSAP timeline
- `*.data.ts` untuk static content dan contracts
- subcomponent lokal (ikon, badge, card) bila perlu

Aturan:

- Gunakan `useGSAP` dengan scope ref untuk setup GSAP
- Import GSAP dari `@/lib/gsap`
- Gunakan selector yang scoped dan `markers: false` sebagai default
