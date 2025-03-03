
const path = require('path')
const express = require('express');
const app = express();
const exHandlebar = require('express-handlebars').engine;
const port = 3000;
const morgan = require('morgan');
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

// connect DB 
db.connect();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'imgs')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: `quanganhdeptrai.up.railway.app::${port}`, // Thay bằng domain frontend của bạn
        credentials: true, // ✅ Cho phép gửi cookie
    })
);

app.engine('hbs', exHandlebar({
    helpers: { sum: (a, b) => a + b },
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource','views'));


route(app);

app.listen(port,'0.0.0.0', () => console.log(`http://localhost::${port}`))