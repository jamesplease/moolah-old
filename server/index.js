const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const BASE_DIR = __dirname;
const VIEWS_DIR = path.join(BASE_DIR, 'views');

const app = express();

// Configure the templating engine
const hbsOptions = {
  extname: '.hbs',
  layoutsDir: VIEWS_DIR + '/layouts',
  partialsDir: VIEWS_DIR + '/partials',
  defaultLayout: 'main'
};
app.set('view engine', '.hbs');
app.set('views', VIEWS_DIR);
app.engine('.hbs', exphbs(hbsOptions));

const port = process.env.PORT || 4321;
app.set('port', port);

app.get('/', function(req, res) {
  return res.render('index');
});

app.listen(port, function() {
  console.log('Node app is running at localhost:' + port);
});
