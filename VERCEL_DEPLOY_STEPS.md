# 🚀 Deploy ke Vercel - Step by Step

Project sudah di-push ke GitHub: https://github.com/himawari19/finance-tracker

Ikuti langkah-langkah di bawah untuk deploy ke Vercel.

---

## Step 1: Buka Vercel Dashboard

1. Buka https://vercel.com
2. Login dengan GitHub account Anda
3. Klik **"Add New"** → **"Project"**

---

## Step 2: Import Repository

1. Di halaman "Import Project", cari repository `finance-tracker`
2. Klik **"Import"**

---

## Step 3: Configure Project

Vercel akan menampilkan form konfigurasi:

- **Project Name:** `finance-tracker` (atau nama lain)
- **Framework:** Next.js (auto-detected)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

Klik **"Deploy"** untuk melanjutkan.

---

## Step 4: Setup Vercel KV Database

Setelah deployment selesai:

1. Buka project di Vercel dashboard
2. Pilih tab **"Storage"**
3. Klik **"Create Database"** → **"KV"**
4. Pilih region:
   - **Singapore** (recommended untuk Indonesia)
   - atau region terdekat lainnya
5. Klik **"Create"**

---

## Step 5: Copy Environment Variables

1. Di tab **"Storage"** → **"KV"**, klik database yang baru dibuat
2. Klik **".env.local"** atau **"Tokens"**
3. Copy semua environment variables:

```
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
```

---

## Step 6: Add Environment Variables ke Project

1. Di project Vercel, buka **"Settings"** → **"Environment Variables"**
2. Paste semua environment variables yang sudah dicopy
3. Klik **"Save"**

---

## Step 7: Redeploy

1. Kembali ke **"Deployments"**
2. Klik **"Redeploy"** pada deployment terakhir
3. Tunggu hingga status berubah menjadi **"Ready"**

---

## Step 8: Test Aplikasi

1. Klik URL yang diberikan Vercel (misal: `https://finance-tracker-xxx.vercel.app`)
2. Login dengan akun demo:
   - Username: `wahyu` | Password: `wahyu123`
   - Username: `nurma` | Password: `nurma123`
3. Test semua fitur:
   - Tambah transaksi
   - Tambah aset
   - Lihat laporan

---

## ✅ Selesai!

Aplikasi sudah live di Vercel! 🎉

---

## 📝 Update Code

Setiap kali update code:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

Vercel akan **auto-deploy** dalam beberapa detik.

---

## 🔗 Links

- **GitHub:** https://github.com/himawari19/finance-tracker
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Live App:** https://finance-tracker-xxx.vercel.app (setelah deploy)

---

## 🐛 Troubleshooting

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

### Login tidak bekerja
- Clear cookies browser
- Coba login ulang
- Check browser console (F12)

---

**Selamat! Aplikasi Anda sudah siap di production! 🚀**
