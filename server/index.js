const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8000;

const userRouter = require('./routes/user.router');
const productsRouter = require('./routes/products.router');

// Замінити
//'http://localhost:3000'
app.use(cors({ origin: 'http://localhost:3000', credentials: true, }))
app.use(express.json())
app.use(cookieParser())

app.use('/api', userRouter)
app.use('/api', productsRouter)

app.get('/', (req, res) => {
   res.send('get is ready.')
})

app.listen(PORT, () => console.log(`Server is working on PORT: ${PORT}`))