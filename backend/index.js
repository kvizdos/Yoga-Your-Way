#!/usr/bin/env node
const express        = require('express');
const app            = require('express')();
const http           = require('http').createServer(app);
const io             = require('socket.io')(http);
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('221705133582-itv52vkrd09pq3dmngas0m4dlj2ga525.apps.googleusercontent.com');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const port      = 19006;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/assets', express.static(`../frontend/assets`))
    
app.use('/sw.js', express.static(`../frontend/sw.js`));
require('./authenticator')(app);

app.get('/', (req, res) => {
    res.sendFile('./frontend/index.html', {root: '../'});
});
    
http.listen(port, () => {
    console.log("YYWV2 started on port " + port);
});