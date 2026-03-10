---
description: Workflow untuk membuat komponen animasi baru dengan boilerplate useGSAP() yang production-ready.
---

# /new-anim [nama] — Create Animation Component

Workflow untuk scaffolding komponen animasi baru yang sudah memiliki setup `useGSAP()`, ref, dan `_README.md`.

## Steps

1. Terima nama komponen dari user (contoh: `/new-anim MagneticButton`).
   - Konversi ke PascalCase jika belum.

2. Buat folder baru di `src/components/animations/[NamaKomponen]/`.

3. Buat file `[NamaKomponen].tsx` di dalam folder tersebut dengan boilerplate berikut:

   ```tsx
   "use client";

   import { useRef } from "react";
   import { useGSAP } from "@gsap/react";
   import gsap from "gsap";

   interface [NamaKomponen]Props {
     children: React.ReactNode;
     className?: string;
   }

   export default function [NamaKomponen]({ children, className }: [NamaKomponen]Props) {
     const containerRef = useRef<HTMLDivElement>(null);

     useGSAP(
       () => {
         // TODO: Implement animation logic
         gsap.from(containerRef.current, {
           opacity: 0,
           duration: 1,
         });
       },
       { scope: containerRef }
     );

     return (
       <div ref={containerRef} className={className}>
         {children}
       </div>
     );
   }
   ```

4. Buat file `index.ts` di dalam folder tersebut:

   ```typescript
   export { default } from "./[NamaKomponen]";
   ```

5. Buat file `_README.md` di dalam folder tersebut:

   ```markdown
   # [NamaKomponen]

   Komponen animasi yang menggunakan GSAP `useGSAP()` hook.

   ## Usage
   \```tsx
   import [NamaKomponen] from "@/components/animations/[NamaKomponen]";

   <[NamaKomponen]>
     <p>Konten yang akan dianimasikan</p>
   </[NamaKomponen]>
   \```

   **📱 Mobile Analogy:** Seperti custom `AnimatedWidget` di Flutter yang membungkus child widget dengan animasi deklaratif.
   ```

6. Tampilkan konfirmasi ke user bahwa komponen berhasil dibuat, beserta path lengkap dan contoh penggunaan.
