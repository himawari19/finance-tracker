# 🐙 GitHub Setup Guide

Panduan untuk push project ke GitHub dan deploy ke Vercel.

---

## Step 1: Buat Repository di GitHub

1. Buka [github.com](https://github.com)
2. Login dengan akun Anda
3. Klik **"New"** (tombol hijau di kiri atas)
4. Isi form:
   - **Repository name:** `keuangan-app`
   - **Description:** Pencatat Keuangan - Multi-akun Finance Tracker
   - **Visibility:** Public (atau Private)
   - **Initialize:** Jangan centang apapun
5. Klik **"Create repository"**

---

## Step 2: Push Code ke GitHub

Jalankan perintah ini di folder `keuangan`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/keuangan-app.git
git branch -M main
git push -u origin main
```

**Ganti `YOUR_USERNAME` dengan username GitHub Anda!**

---

## Step 3: Verifikasi di GitHub

1. Buka https://github.com/YOUR_USERNAME/keuangan-app
2. Pastikan semua file sudah ter-upload
3. Lihat commit history

---

## Step 4: Setup Vercel

### 4.1 Buat Akun Vercel
1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel

### 4.2 Import Project
1. Di Vercel dashboard, klik **"Add New"** → **"Project"**
2. Pilih repository `keuangan-app`
3. Klik **"Import"**

### 4.3 Configure Project
1. Framework: **Next.js** (auto-detected)
2. Build Command: `npm run build` (default)
3. Output Directory: `.next` (default)
4. Klik **"Deploy"**

---

## Step 5: Setup Vercel KV Database

### 5.1 Buat Database
1. Di project Vercel, pilih tab **"Storage"**
2. Klik **"Create Database"** → **"KV"**
3. Pilih region (misal: **Singapore**)
4. Klik **"Create"**

### 5.2 Copy Environment Variables
1. Buka tab **"KV"** di Storage
2. Klik **".env.local"** atau **"Tokens"**
3. Copy semua variable:
   ```
   KV_URL=
   KV_REST_API_URL=
   KV_REST_API_TOKEN=
   KV_REST_API_READ_ONLY_TOKEN=
   ```

### 5.3 Add ke Project
1. Di project settings, pilih **"Environment Variables"**
2. Paste semua variable
3. Klik **"Save"**

---

## Step 6: Deploy

1. Vercel akan auto-deploy setelah environment variables di-add
2. Tunggu hingga status berubah menjadi **"Ready"**
3. Klik URL untuk membuka aplikasi

---

## ✅ Verifikasi Deployment

1. Buka URL yang diberikan Vercel
2. Login dengan akun demo:
   - Username: `wahyu` | Password: `wahyu123`
3. Test fitur:
   - Tambah transaksi
   - Tambah aset
   - Lihat laporan

---

## 🔄 Update Code

Setiap kali update code:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

Vercel akan auto-deploy dalam beberapa detik.

---

## 🐛 Troubleshooting

### Error: "Repository not found"
- Pastikan URL GitHub benar
- Pastikan repository sudah public (atau Vercel authorized)

### Error: "Build failed"
- Check Vercel build logs
- Verify environment variables
- Check TypeScript errors

### Error: "KV_URL is not defined"
- Pastikan environment variables sudah di-add
- Redeploy project

### Data tidak tersimpan
- Pastikan Vercel KV database aktif
- Check di Vercel dashboard → Storage → KV

---

## 📝 Useful Links

- GitHub: https://github.com/YOUR_USERNAME/keuangan-app
- Vercel: https://vercel.com/dashboard
- Vercel KV Docs: https://vercel.com/docs/storage/vercel-kv

---

## 🎯 Next Steps

1. ✅ Push ke GitHub
2. ✅ Import di Vercel
3. ✅ Setup Vercel KV
4. ✅ Deploy
5. ✅ Test aplikasi

**Selesai! Aplikasi sudah live! 🚀**

---

**Version:** 1.0.0  
**Last Updated:** January 4, 2026
