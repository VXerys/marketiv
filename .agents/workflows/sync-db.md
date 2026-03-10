---
description: Workflow untuk men-generate dan sync TypeScript types dari Supabase schema ke proyek lokal.
---

# /sync-db — Supabase Type Generation

Workflow untuk men-generate tipe TypeScript terbaru dari Supabase database schema ke `src/types/supabase.ts`.

## Prerequisites
- Supabase CLI harus terinstal (`npm install -g supabase`)
- User harus sudah login (`supabase login`)
- Project ID Supabase harus diketahui

## Steps

1. Cek apakah Supabase CLI sudah terinstal:
   ```bash
   supabase --version
   ```
   Jika belum, instruksikan user untuk menginstal:
   ```bash
   npm install -g supabase
   ```

2. Cek apakah user sudah login:
   ```bash
   supabase projects list
   ```
   Jika belum login, instruksikan:
   ```bash
   supabase login
   ```

3. Tanyakan Project ID kepada user jika belum diketahui, atau cek dari output `supabase projects list`.

4. Jalankan perintah type generation:
   ```bash
   supabase gen types typescript --project-id <PROJECT_ID> --schema public > src/types/supabase.ts
   ```

5. Verifikasi file `src/types/supabase.ts` berhasil dibuat/diupdate dengan membaca beberapa baris pertama.

6. Tampilkan ringkasan ke user:
   - Jumlah tabel yang di-generate
   - Path file output
   - Contoh cara menggunakan tipe:
     ```typescript
     import { Database } from "@/types/supabase";

     type Project = Database["public"]["Tables"]["projects"]["Row"];
     ```
   - Reminder: jalankan `/sync-db` lagi setiap kali ada perubahan schema di Supabase Dashboard.
