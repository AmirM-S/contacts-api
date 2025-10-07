# دفترچه تلفن | Contacts API

## توضیح پروژه

این پروژه یک API ساده برای مدیریت دفترچه تلفن است. کاربران می‌توانند مخاطبین را اضافه، ویرایش، حذف و مشاهده کنند.

تکنولوژی‌ها:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman (برای تست API)


## ویژگی‌ها

- افزودن مخاطب جدید (نام، شماره تماس، ایمیل)
- مشاهده تمام مخاطبین
- مشاهده جزئیات یک مخاطب خاص
- ویرایش اطلاعات مخاطب
- حذف مخاطب
- اعتبارسنجی داده‌ها در سطح سرور
- مستند‌سازی API با Postman Collection


## نصب و اجرای لوکال

### پیش‌نیازها

- نصب Node.js نسخه ۱۸ یا بالاتر
- ایجاد دیتابیس در MongoDB Atlas
- اضافه کردن IP `0.0.0.0/0` برای دسترسی از همه‌جا

### مراحل اجرا

1. کلون کردن پروژه:
```bash
git clone https://github.com/AmirM-S/contacts-api.git
cd contacts-api
```

2. نصب وابستگی‌ها:
```bash
npm install
```

3. ساخت فایل `.env` و تنظیم مقادیر زیر:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_uri
```

4. اجرای سرور:
```bash
npm start
```

5. مشاهده در مرورگر:
```
http://localhost:3000
```


## مسیرهای API

| متد | مسیر | توضیح |
|-----|------|-------|
| POST | `/api/contacts` | افزودن مخاطب جدید |
| GET | `/api/contacts` | دریافت لیست تمام مخاطبین |
| GET | `/api/contacts/:id` | دریافت اطلاعات یک مخاطب |
| PUT | `/api/contacts/:id` | ویرایش اطلاعات مخاطب |
| DELETE | `/api/contacts/:id` | حذف مخاطب |


## نمونه درخواست

### POST /api/contacts
```json
{
  "name": "علی رضایی",
  "phone": "09123456789",
  "email": "ali@gmail.com"
}
```

### نمونه پاسخ
```json
{
  "_id": "652b8e8f76b2a85b3c18b9aa",
  "name": "علی رضایی",
  "phone": "09123456789",
  "email": "ali@gmail.com"
}
```


## مستندات Postman

تمام مسیرهای API در قالب یک Postman Collection آماده شده‌اند. فایل آن در پوشه پروژه با نام زیر قرار دارد:

`postman_collection.json`


## لینک نسخه Deploy شده

پروژه روی Shiper.app مستقر شده و از طریق لینک زیر در دسترس است:

https://contacts-api.on.shiper.app/
