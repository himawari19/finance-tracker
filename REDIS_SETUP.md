# 🔴 Redis Setup Guide

Panduan lengkap untuk setup Redis database dari Vercel Marketplace.

---

## 📋 Ringkas

Aplikasi ini menggunakan **Redis** (dari Vercel Marketplace) sebagai database.

**Environment Variables yang dibutuhkan:**
```
REDIS_URL=
REDIS_REST_API_URL=
REDIS_REST_API_TOKEN=
REDIS_REST_API_READ_ONLY_TOKEN=
```

---

## 🚀 Step-by-Step Setup

### Step 1: Buka Vercel Project

1. Buka https://vercel.com/dashboard
2. Pilih project `finance-tracker`

---

### Step 2: Buka Storage Tab

1. Di project, klik tab **"Storage"**
2. Klik tombol **"Create Database"**

---

### Step 3: Pilih Redis

1. Di halaman "Create a database", lihat bagian **"Marketplace Database Providers"**
2. Cari dan klik **"Redis"** (Serverless Redis)
3. Klik **"Create"**

---

### Step 4: Konfigurasi Redis

1. **Database Name:** `finance-tracker-redis` (atau nama lain)
2. **Region:** Pilih **Singapore** (recommended untuk Indonesia)
3. **Plan:** Pilih plan yang sesuai (free atau berbayar)
4. Klik **"Create"**

---

### Step 5: Copy Environment Variables

Setelah Redis database dibuat:

1. Vercel akan menampilkan environment variables
2. Copy semua 4 variable:
   - `REDIS_URL`
   - `REDIS_REST_API_URL`
   - `REDIS_REST_API_TOKEN`
   - `REDIS_REST_API_READ_ONLY_TOKEN`

---

### Step 6: Add ke Project

1. Di project Vercel, buka **"Settings"** → **"Environment Variables"**
2. Paste semua 4 environment variables
3. Klik **"Save"**

---

### Step 7: Redeploy

1. Kembali ke **"Deployments"**
2. Klik **"Redeploy"** pada deployment terakhir
3. Tunggu hingga status berubah menjadi **"Ready"**

---

## ✅ Verifikasi

Setelah redeploy selesai:

1. Buka aplikasi di URL Vercel
2. Login dengan akun demo:
   - Username: `wahyu` | Password: `wahyu123`
3. Coba tambah transaksi
4. Refresh halaman
5. Transaksi harus masih ada (berarti database bekerja)

---

## 🔍 Troubleshooting

### Error: "REDIS_URL is not defined"

**Solusi:**
1. Pastikan environment variables sudah di-add di Vercel
2. Redeploy project
3. Clear browser cache (Ctrl+Shift+Delete)

### Error: "Connection refused"

**Solusi:**
1. Check Redis database status di Vercel dashboard
2. Pastikan region sudah dipilih
3. Tunggu beberapa menit untuk Redis fully initialize

### Data tidak tersimpan

**Solusi:**
1. Check Vercel logs (Deployments → Logs)
2. Pastikan Redis database aktif
3. Check browser console (F12 → Console)

### Aplikasi lambat

**Solusi:**
1. Redis mungkin sedang busy
2. Tunggu beberapa saat
3. Refresh halaman

---

## 📊 Monitor Redis

### Di Vercel Dashboard

1. Buka project
2. Klik tab **"Storage"**
3. Klik database Redis
4. Lihat:
   - Status (Active/Inactive)
   - Usage
   - Connections

---

## 🔐 Security

- ✅ Token sudah di-protect oleh Vercel
- ✅ Hanya bisa diakses dari Vercel project
- ✅ HTTPS connection
- ✅ Encrypted data

---

## 💰 Pricing

**Free Plan:**
- 256MB storage
- Unlimited connections
- Unlimited commands

**Paid Plans:**
- Lebih besar storage
- Priority support
- Custom configurations

---

## 📚 Dokumentasi

- [Vercel Redis Docs](https://vercel.com/docs/storage/redis)
- [Upstash Redis Docs](https://upstash.com/docs)
- [Redis Commands](https://redis.io/commands)

---

## 🎯 Apa yang Disimpan di Redis

### Transactions
```
transaction:{id} → Transaction data
transactions:{userId} → List of transaction IDs
```

### Assets
```
asset:{id} → Asset data
assets:{userId} → List of asset IDs
```

### Sessions
```
session:{token} → User ID (expires in 7 days)
```

---

## 🔄 Backup & Restore

Redis di Vercel Marketplace tidak memiliki built-in backup.

**Rekomendasi:**
1. Export data secara berkala
2. Simpan di cloud storage (Google Drive, Dropbox, dll)
3. Atau gunakan paid plan dengan backup features

---

## 🚀 Next Steps

1. ✅ Setup Redis database
2. ✅ Add environment variables
3. ✅ Redeploy project
4. ✅ Test aplikasi
5. ✅ Monitor Redis usage

---

**Selamat! Redis database sudah siap! 🎉**

---

**Version:** 1.0.0  
**Last Updated:** January 4, 2026
