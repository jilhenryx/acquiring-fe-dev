const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const getPaymentSession = require('./services/get-payment-session');
const postPaymentSession = require('./services/post-payment-session');

const app = express();
const { PORT } = process.env;

app.use(express.json(), (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({
      code: 'ERR',
      error: true,
      message:
        'Error encountered in parsing request payload. Please check payload and try again',
    });
  } else {
    next();
  }
});
app.use(express.urlencoded({ extended: true }));

app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    layoutsDir: false,
    partialsDir: false,
    defaultLayout: false,
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/payment-sessions/:ref', getPaymentSession);
app.post('/payment-sessions/:ref', postPaymentSession);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
