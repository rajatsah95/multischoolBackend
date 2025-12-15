const express = require('express');
const userRouter=require("./routes/user.routes")
const authRouter=require("./routes/auth.routes")
const schoolRouter=require("./routes/school.routes")
const studentRouter=require("./routes/student.routes")
require('dotenv').config();

const { sequelize } = require('./models');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send("welcome to multischoolBackend");
});
app.use(authRouter);
app.use(studentRouter)
app.use(userRouter);
app.use(schoolRouter);
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT}`)
  );
});
