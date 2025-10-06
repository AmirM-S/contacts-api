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
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      dateFrom,
      dateTo,
    } = req.query;

    const skip =
      (Math.max(1, parseInt(page, 10)) - 1) * Math.max(1, parseInt(limit, 10));
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo);
      }
    }

    const sortConfig = {};
    sortConfig[sortBy] = sortOrder === "asc" ? 1 : -1;

    const total = await Contact.countDocuments(filter);
    const data = await Contact.find(filter)
      .sort(sortConfig)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
        hasNext: skip + Number(limit) < total,
        hasPrev: Number(page) > 1,
      },
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

const searchContacts = async (req, res, next) => {
  try {
    const { q, name, phone, email, page = 1, limit = 10 } = req.query;

    const skip =
      (Math.max(1, parseInt(page, 10)) - 1) * Math.max(1, parseInt(limit, 10));
    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (phone) {
      filter.phone = { $regex: phone, $options: "i" };
    }

    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    const total = await Contact.countDocuments(filter);
    const data = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      message: `${total} مخاطب یافت شد`,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
      data,
    });
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
  searchContacts,
};
