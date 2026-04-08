const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/storeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const clothSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  image: String
});

const Cloth = mongoose.model("Cloth", clothSchema);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const clothes = await Cloth.find();

  const editId = req.query.editId;
  let clothToEdit = null;

  if (editId) {
    clothToEdit = await Cloth.findById(editId);
  }

  res.render("index", { clothes, clothToEdit });
});

app.post("/createData", async (req, res) => {
  await Cloth.create(req.body);
  res.redirect("/");
});

app.post("/deleteData/:id", async (req, res) => {
  try {
    await Cloth.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error deleting item");
  }
});

app.post("/updateData/:id", async (req, res) => {
  try {
    await Cloth.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error updating item");
  }
})

app.listen(5000, () => {
  console.log("working");
});

