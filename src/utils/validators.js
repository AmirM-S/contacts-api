const isValidPhone = (p) => {
  if (!p) return false;
  return /^\+?[0-9]{7,15}$/.test(p);
};

const isValidEmail = (email) => {
  if (!email) return true;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const isValidName = (name) => {
  if (!name || !String(name).trim()) return false;
  const trimmed = String(name).trim();
  return trimmed.length >= 2 && trimmed.length <= 50;
};

function validateContact(req, res, next) {
  const { name, phone, email } = req.body;
  const errors = [];

  if (!isValidName(name)) {
    errors.push("نام ضروری است و باید بین ۲ تا ۵۰ کاراکتر باشد");
  }

  if (!phone) {
    errors.push("شماره تلفن ضروری است");
  } else if (!isValidPhone(phone)) {
    errors.push("فرمت شماره تلفن نامعتبر است");
  }

  if (email && !isValidEmail(email)) errors.push("فرمت ایمیل نامعتبر است");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "خطا در اعتبارسنجی داده‌ها",
      errors,
    });
  }

  next();
}

module.exports = { validateContact };
