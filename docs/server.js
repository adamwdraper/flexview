const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'html');

// Routes ---------------------------------------
app.get('/\[0-9]\?', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen ---------------------------------------
app.listen(port, function () {
    console.log('Listening on port ' + port);
});