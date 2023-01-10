require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const colors = require("@colors/colors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

require("./config/mongoose.config");

// Routes
const emailRoutes = require("./routes/emails.routes");
emailRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(
    colors.magenta("Listening on port ") + colors.rainbow(`${PORT}\n`)
  );
});
