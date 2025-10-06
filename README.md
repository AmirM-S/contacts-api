# 📇 Contacts API

یک REST API کامل برای مدیریت مخاطبین، ساخته شده با Express.js و MongoDB

## ✨ ویژگی‌ها

- ✅ عملیات CRUD کامل (ایجاد، خواندن، ویرایش، حذف)
- 🔍 جستجوی پیشرفته در مخاطبین
- 📄 صفحه‌بندی (Pagination)
- 🔢 مرتب‌سازی بر اساس فیلدهای مختلف
- 📅 فیلتر بر اساس تاریخ
- ✔️ اعتبارسنجی داده‌ها (Validation)
- 🔒 امنیت با Helmet.js
- 🌐 پشتیبانی از CORS
- 📝 مدیریت خطاها
- 🚀 آماده برای Deploy

## 📋 پیش‌نیازها

- Node.js (نسخه 14 یا بالاتر)
- npm یا yarn
- حساب کاربری MongoDB Atlas (نسخه رایگان کافیست)

## 🚀 نصب و راه‌اندازی

### 1. کلون کردن پروژه

```bash
git clone <repository-url>
cd contacts-api
```

### 2. نصب وابستگی‌ها

```bash
npm install
```

### 3. تنظیم متغیرهای محیطی

یک فایل `.env` در ریشه پروژه ایجاد کنید:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts-db?retryWrites=true&w=majority
```

> **نکته:** `username` و `password` را با اطلاعات واقعی MongoDB Atlas خود جایگزین کنید

### 4. اجرای پروژه

```bash
# حالت Development (با nodemon)
npm run dev

# حالت Production
npm start
```

سرور روی `http://localhost:3000` اجرا خواهد شد

## 📚 مستندات API

### Base URL
```
http://localhost:3000/api/contacts
```

### Endpoints

#### 1️⃣ ایجاد مخاطب جدید

```http
POST /api/contacts
```

**Body:**
```json
{
  "name": "علی احمدی",
  "phone": "+989123456789",
  "email": "ali@example.com",
  "address": "تهران، خیابان آزادی"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "علی احمدی",
    "phone": "+989123456789",
    "email": "ali@example.com",
    "address": "تهران، خیابان آزادی",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2️⃣ دریافت لیست مخاطبین

```http
GET /api/contacts
```

**Query Parameters:**
- `page` (number) - شماره صفحه (پیش‌فرض: 1)
- `limit` (number) - تعداد در هر صفحه (پیش‌فرض: 10)
- `search` (string) - جستجو در نام، ایمیل، شماره تلفن
- `sortBy` (string) - فیلد مرتب‌سازی (پیش‌فرض: createdAt)
- `sortOrder` (string) - نحوه مرتب‌سازی: asc یا desc (پیش‌فرض: desc)
- `dateFrom` (date) - فیلتر از تاریخ
- `dateTo` (date) - فیلتر تا تاریخ

**مثال:**
```http
GET /api/contacts?page=1&limit=10&search=علی&sortBy=name&sortOrder=asc
```

**Response:**
```json
{
  "success": true,
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [...]
}
```

#### 3️⃣ دریافت یک مخاطب

```http
GET /api/contacts/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "علی احمدی",
    "phone": "+989123456789",
    "email": "ali@example.com"
  }
}
```

#### 4️⃣ ویرایش مخاطب

```http
PUT /api/contacts/:id
```

**Body:**
```json
{
  "name": "علی محمدی",
  "email": "alimohammadi@example.com"
}
```

#### 5️⃣ حذف مخاطب

```http
DELETE /api/contacts/:id
```

**Response:**
```json
{
  "success": true,
  "message": "حذف انجام شد"
}
```

#### 6️⃣ جستجوی پیشرفته

```http
GET /api/contacts/search
```

**Query Parameters:**
- `q` (string) - جستجوی عمومی
- `name` (string) - جستجو در نام
- `phone` (string) - جستجو در شماره تلفن
- `email` (string) - جستجو در ایمیل
- `page` (number) - شماره صفحه
- `limit` (number) - تعداد در هر صفحه

**مثال:**
```http
GET /api/contacts/search?q=علی&page=1&limit=10
```

#### 7️⃣ بررسی سلامت سرور

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📦 ساختار پروژه

```
contacts-api/
├── src/
│   ├── config/
│   │   └── database.js          # تنظیمات MongoDB
│   ├── models/
│   │   └── contact.model.js     # مدل مخاطب
│   ├── controllers/
│   │   └── contact.controller.js # لوجیک‌های کنترلر
│   ├── routes/
│   │   └── contact.route.js     # مسیرها (Routes)
│   ├── middlewares/
│   │   └── errorHandler.js      # مدیریت خطاها
│   ├── utils/
│   │   └── validators.js        # اعتبارسنجی
│   └── app.js                    # تنظیمات Express
├── server.js                     # نقطه شروع برنامه
├── .env                          # متغیرهای محیطی
├── .env.example                  # نمونه متغیرهای محیطی
├── .gitignore
├── package.json
└── README.md
```

## 🗂️ مدل داده (Schema)

```javascript
{
  name: String (required, 2-50 characters),
  phone: String (required, unique),
  email: String (optional, unique),
  address: String (optional, max 200 characters),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## ⚠️ مدیریت خطاها

API از فرمت یکسانی برای خطاها استفاده می‌کند:

```json
{
  "success": false,
  "message": "توضیحات خطا",
  "errors": ["خطا 1", "خطا 2"]
}
```

**کدهای وضعیت HTTP:**
- `200` - موفقیت
- `201` - ایجاد شد
- `400` - درخواست نامعتبر
- `404` - یافت نشد
- `500` - خطای سرور

## 🔒 امنیت

- ✅ استفاده از Helmet.js برای تنظیم هدرهای امنیتی
- ✅ CORS فعال برای دسترسی Cross-Origin
- ✅ اعتبارسنجی کامل ورودی‌ها
- ✅ مدیریت استاندارد خطاها

## 🚀 Deploy

### MongoDB Atlas

1. ثبت‌نام در [MongoDB Atlas](https://cloud.mongodb.com)
2. ایجاد یک Cluster رایگان
3. در **Network Access**، IP خود را اضافه کنید (یا `0.0.0.0/0` برای دسترسی از همه جا)
4. در **Database Access**، یک User ایجاد کنید
5. Connection String را کپی کرده و در `.env` قرار دهید

### Deployment Platforms

این پروژه آماده Deploy روی پلتفرم‌های زیر است:

- **Render**: رایگان و آسان
- **Railway**: رایگان با MongoDB داخلی
- **Vercel**: Serverless deployment
- **Heroku**: با پلاگین MongoDB

**مثال برای Render:**

1. کد را به GitHub push کنید
2. در Render، یک Web Service جدید ایجاد کنید
3. Repository خود را متصل کنید
4. متغیرهای محیطی را اضافه کنید
5. Deploy!

## 🧪 تست با cURL

```bash
# ایجاد مخاطب
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"علی احمدی","phone":"+989123456789","email":"ali@example.com"}'

# دریافت لیست
curl http://localhost:3000/api/contacts

# جستجو
curl "http://localhost:3000/api/contacts?search=علی"

# دریافت یک مخاطب
curl http://localhost:3000/api/contacts/{id}

# ویرایش
curl -X PUT http://localhost:3000/api/contacts/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"علی محمدی"}'

# حذف
curl -X DELETE http://localhost:3000/api/contacts/{id}
```

## 🛠️ تکنولوژی‌های استفاده شده

- **Express.js** - فریمورک وب
- **MongoDB & Mongoose** - دیتابیس و ODM
- **Helmet** - امنیت
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - مدیریت متغیرهای محیطی
- **Nodemon** - Auto-reload در development

## 📝 نکات مهم

- فیلدهای `name` و `phone` الزامی هستند
- فیلد `phone` باید یکتا (unique) باشد
- فیلد `email` اختیاری است ولی در صورت وجود باید یکتا باشد
- نام باید بین 2 تا 50 کاراکتر باشد
- آدرس حداکثر 200 کاراکتر

## 🤝 مشارکت

این پروژه برای ارزیابی مصاحبه طراحی شده است.

## 📄 لایسنس

ISC

---

**ساخته شده با ❤️ با استفاده از Express.js و MongoDB**

