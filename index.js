require("dotenv").config();

const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`La API en NodeJS esta corriendo en el puerto ${PORT}`);
});
