const express = require("express");
require("dotenv").config();
const productsRouter = require('./routes/products')
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const app = express();

const connectDB = require('./db/connect')

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products</a>');
});

//products route
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening to the ${port}`));
  } catch (error) {
      console.log(error);
  }
};

start();