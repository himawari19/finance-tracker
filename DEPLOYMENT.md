# Panduan Deployment ke Vercel

## Langkah 1: Persiapan GitHub

### 1.1 Buat Repository di GitHub
1. Buka [github.com](https://github.com)
2. Klik "New repository"
3. Nama: `keuangan-app`
4. Pilih "Public" atau "Private"
5. Jangan initialize dengan README (sudah ada)
6. Klik "Create repository"

### 1.2 Push Code ke GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/keuangan-app.git
git branch -M main
git push -u origin main
```

## Langkah 2: Setup Vercel KV Database

### 2.1 Buat Project di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik "Add New" → "Project"
4. Pilih repository `keuangan-app`
5. Klik "Import"

### 2.2 Setup Environment Variables
1. Di halaman project settings, pilih "Storage"
2. Klik "Create Database" → "KV"
3. Pilih region terdekat (misal: Singapore)
4. Klik "Create"
5. Vercel akan auto-generate environment variables

### 2.3 Copy Environment Variables
1. Buka tab "KV" di Storage
2. Klik "Tokens" atau "Environment Variables"
3. Copy semua variable:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### 2.4 Add ke Project
1. Di project settings, pilih "Environment Variables"
2. Paste semua variable yang sudah dicopy
3. Klik "Save"

## Langkah 3: Deploy

### 3.1 Automatic Deploy
- Vercel akan auto-deploy setiap kali push ke `main` branch
- Tunggu hingga status berubah menjadi "Ready"

### 3.2 Manual Deploy
```bash
npm install -g vercel
vercel
```

## Langkah 4: Verifikasi

1. Buka URL yang diberikan Vercel (misal: `https://keuangan-app.vercel.app`)
2. Login dengan akun demo:
   - Username: `wahyu` | Password: `wahyu123`
   - Username: `nurma` | Password: `nurma123`
3. Test fitur:
   - Tambah transaksi
   - Tambah aset
   - Lihat laporan

## Troubleshooting

### Error: "KV_URL is not defined"
- Pastikan environment variables sudah di-add di Vercel
- Redeploy project setelah add variables

### Error: "Unauthorized"
- Clear cookies browser
- Login ulang

### Data tidak tersimpan
- Pastikan Vercel KV database sudah aktif
- Check di Vercel dashboard → Storage → KV

## Update Code

Setiap kali update code:
```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

Vercel akan auto-deploy dalam beberapa detik.

## Custom Domain (Optional)

1. Di Vercel project settings, pilih "Domains"
2. Klik "Add Domain"
3. Masukkan domain Anda
4. Follow instruksi DNS configuration
5. Tunggu hingga verified

## Monitoring

- Buka [vercel.com/dashboard](https://vercel.com/dashboard)
- Pilih project `keuangan-app`
- Lihat analytics, logs, dan deployment history
