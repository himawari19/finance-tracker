# 🔴 Redis Setup - Simple Version

**Anda hanya perlu 1 environment variable: `REDIS_URL`**

---

## 🎯 Yang Anda Dapatkan dari Vercel

```
REDIS_URL=redis://:xxxxx@xxxxx.upstash.io:xxxxx
```

Itu saja! Tidak perlu variable lain.

---

## 📋 Langkah Setup

### 1. Copy REDIS_URL
Dari Vercel Storage → Redis database, copy value `REDIS_URL`

### 2. Add ke Vercel Project
```
Settings → Environment Variables
→ Paste REDIS_URL
→ Save
```

### 3. Redeploy
```
Deployments → Redeploy
→ Tunggu hingga Ready
```

### 4. Test
```
Buka aplikasi
→ Login: wahyu / wahyu123
→ Tambah transaksi
→ Refresh halaman
→ Transaksi masih ada? ✅ Berhasil!
```

---

## ✅ Selesai!

Aplikasi Anda sudah connected ke Redis! 🎉

---

## 🔍 Jika Ada Error

### Error: "Unable to find environment variable"
- Pastikan REDIS_URL sudah di-add di Vercel
- Redeploy project
- Tunggu 1-2 menit

### Error: "Connection refused"
- Check Redis database status di Vercel
- Pastikan database sudah "Active"
- Tunggu beberapa menit

### Data tidak tersimpan
- Check Vercel logs
- Pastikan Redis database aktif
- Coba refresh halaman

---

**Version:** 1.0.0
