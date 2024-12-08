require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');


const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static('assets'));

// tamplate engine

app.use(expressLayout);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

app.get('/', require('./routes/main'));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
