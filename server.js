const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'html');

// Routes ---------------------------------------
app.get('/\[0-9]\?', function (req, res) {
    res.sendfile('index.html');
});

// Listen ---------------------------------------
app.listen(port, function () {
    console.log('Listening on port ' + port);
});