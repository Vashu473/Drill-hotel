# Deploy Deli Grill on Vercel

## Option A — Client demo (no MongoDB)

Best for showing the website to a client. **Do not add** `MONGODB_URI`.

### 1. Push code to GitHub

```bash
git add .
git commit -m "Prepare Vercel demo deploy"
git push
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `deli-grill` repository
3. Framework: **Next.js** (auto-detected)
4. **Environment variables** (Settings → Environment Variables):

| Name | Value |
|------|--------|
| `JWT_SECRET` | any long random string |
| `ADMIN_ID` | `admin` |
| `ADMIN_PASSWORD` | your secure password |
**Do not set** `ENVIRONMENT=LIVE` or `MONGODB_URI` for demo.

5. Click **Deploy**

### 3. What works in demo

- Full website (home, menu, gallery pages)
- 6 preview cards on home + full `/menu` and `/gallery`
- Reservation & contact forms → success toast (not saved)
- Admin login → dashboard with sample counts
- Admin menu/gallery **upload** → disabled (needs MongoDB + VPS for files)

### URLs after deploy

- Site: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin/login`

---

## Option B — Real backend (MongoDB Atlas)

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string → `MONGODB_URI`
3. On Vercel, add:

| Name | Value |
|------|--------|
| `MONGODB_URI` | `mongodb+srv://...` |
| `JWT_SECRET` | random string |
| `ADMIN_ID` | `admin` |
| `ADMIN_PASSWORD` | secure password |

4. Set `ENVIRONMENT=LIVE`
5. Redeploy

Reservations, messages, and menu data will persist in MongoDB.

**Note:** Image upload (Multer → `public/uploads`) does **not** persist on Vercel serverless. For production file uploads use Cloudinary or deploy API on Railway/VPS.

---

## CLI deploy

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts. Add env vars in Vercel dashboard or:

```bash
vercel env add JWT_SECRET
vercel env add ADMIN_PASSWORD
vercel --prod
```
