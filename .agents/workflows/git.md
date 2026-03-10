---
description: Workflow Git — auto-read changes, generate conventional commit, add, commit, push.
---

# /git — Git Commit & Push Workflow

// turbo-all

Workflow otomatis untuk membaca perubahan, membuat pesan commit konvensional, dan push ke remote.

## Steps

1. Jalankan `git status` untuk melihat file yang berubah.

2. Jalankan `git diff --stat` untuk melihat ringkasan perubahan.

3. Jalankan `git diff` (atau `git diff --cached` jika sudah staged) untuk membaca detail perubahan.

4. Berdasarkan diff, generate pesan commit menggunakan **Conventional Commits** format:
   - `feat: ...` — fitur baru
   - `fix: ...` — perbaikan bug
   - `style: ...` — perubahan styling/CSS
   - `refactor: ...` — refaktoring tanpa perubahan fungsional
   - `chore: ...` — maintenance, dependensi, config
   - `docs: ...` — dokumentasi
   - `perf: ...` — peningkatan performa
   - `anim: ...` — perubahan animasi GSAP/Lenis (custom scope)

   Rules:
   - Subject line maksimal 72 karakter, huruf kecil, tanpa titik di akhir
   - Jika perubahan menyentuh banyak area, gunakan scope: `feat(hero): add parallax effect`
   - Body commit (opsional) menjelaskan "mengapa", bukan "apa"

5. Tampilkan pesan commit yang di-generate ke user untuk konfirmasi.

6. Setelah user setuju, jalankan:
   ```bash
   git add .
   ```

7. Jalankan:
   ```bash
   git commit -m "<pesan commit yang sudah dikonfirmasi>"
   ```

8. Jalankan:
   ```bash
   git push
   ```

9. Konfirmasi ke user bahwa push berhasil beserta ringkasan commit.
