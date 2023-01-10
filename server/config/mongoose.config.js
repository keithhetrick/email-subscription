const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbName = process.env.DATABASE_NAME;
const colors = require("@colors/colors");

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      colors.america("Established a connection to the ") +
        colors.inverse(`${dbName}`) +
        colors.random(" database\n")
    )
  )
  .catch((err) => console.log(err));
