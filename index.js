const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRouter = require('./routes/authRoute');
const productCategoryRouter = require("./routes/productCategoryRoute");
const productRouter = require("./routes/productRoute");
const blogCategoryRouter = require("./routes/blogCategoryRoute");
const blogRouter = require("./routes/blogRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");



const PORT = process.env.PORT || 4000;
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/user', authRouter);
app.use('/api/product-category', productCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/blog-category', blogCategoryRouter);
app.use('/api/blog', blogRouter);
app.use('/api/brand', brandRouter);
app.use('/api/coupon', couponRouter);




app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});