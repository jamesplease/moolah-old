const express = require('express');

const app = express();

const port = process.env.PORT || 4321;
app.set('port', port);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Node app is running at localhost:' + port);
});
