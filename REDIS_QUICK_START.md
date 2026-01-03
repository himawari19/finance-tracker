# 🔴 Redis Quick Start

**TL;DR** - Setup Redis dalam 5 menit

---

## 🎯 Yang Perlu Anda Lakukan

### 1. Buka Vercel Storage
```
https://vercel.com/dashboard
→ Project: finance-tracker
→ Tab: Storage
→ Klik: Create Database
```

### 2. Pilih Redis
```
Marketplace Database Providers
→ Redis (Serverless Redis)
→ Klik: Create
```

### 3. Konfigurasi
```
Database Name: finance-tracker-redis
Region: Singapore
Plan: Free (atau pilih yang lain)
→ Klik: Create
```

### 4. Copy Variables
Vercel akan menampilkan 4 environment variables:
```
REDIS_URL=...
REDIS_REST_API_URL=...
REDIS_REST_API_TOKEN=...
REDIS_REST_API_READ_ONLY_TOKEN=...
```

### 5. Add ke Project
```
Settings → Environment Variables
→ Paste semua 4 variables
→ Klik: Save
```

### 6. Redeploy
```
Deployments
→ Klik: Redeploy
→ Tunggu hingga Ready
```

### 7. Test
```
Buka aplikasi
→ Login: wahyu / wahyu123
→ Tambah transaksi
→ Refresh halaman
→ Transaksi masih ada? ✅ Berhasil!
```

---

## ✅ Selesai!

Aplikasi Anda sudah connected ke Redis database! 🎉

---

## 📖 Dokumentasi Lengkap

Baca **REDIS_SETUP.md** untuk detail lebih lanjut.

---

**Version:** 1.0.0
