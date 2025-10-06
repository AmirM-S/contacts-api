const isValidPhone = (p) => {
    if (!p) return false;
    return /^\+?[0-9]{7,15}$/.test(p);
  };
  
  const isValidEmail = (e) => {
    if (!e) return true;
    return /^\S+@\S+\.\S+$/.test(e);
  };
  
  function validateContact(req, res, next) {
    const { name, phone, email } = req.body;
    const errors = [];
  
    if (!name || !String(name).trim()) errors.push('نام ضروری است');
    if (!phone) errors.push('phone is required');
    else if (!isValidPhone(phone)) errors.push('فرمت شماره موبایل نامعتبر است');
  
    if (email && !isValidEmail(email)) errors.push('فرمت ایمیل نامعتبر است');
  
    if (errors.length) return res.status(400).json({ success: false, errors });
  
    next();
  }
  
  module.exports = { validateContact };
  