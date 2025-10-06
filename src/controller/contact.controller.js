const Contact = require("../models/contact.model");
const mongoose = require("mongoose");

const createContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const contact = await Contact.create({ name, phone, email });
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip =
      (Math.max(1, parseInt(page, 10)) - 1) * Math.max(1, parseInt(limit, 10));
    const filter = {};

    const total = await Contact.countDocuments(filter);
    const data = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      meta: { total, page: Number(page), limit: Number(limit) },
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "شناسه نامعتبر است" });

    const contact = await Contact.findById(id).lean();
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "اطلاعات یافت نشد" });

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "شناسه نامعتبر است" });

    const updates = req.body;
    const contact = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "اطلاعاتی یافت نشد" });

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "شناسه نامعتبر است" });

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: "اطلاعاتی یافت نشد" });

    res.json({ success: true, message: "حذف انجام شد" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
