const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./routes/contact.route');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/contacts', contactRoutes);

app.use(errorHandler);

module.exports = app;