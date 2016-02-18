var express = require('express');
var app = express();
var port = Number(process.env.PORT || 3000);
app.use(express.static(__dirname + '/dist'));
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});