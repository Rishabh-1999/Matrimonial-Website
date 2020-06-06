var app = require('express').Router();

app.use('/user', require('./Handlers/user.js'));
app.use('/admin', require('./Handlers/admin.js'));

module.exports = app;