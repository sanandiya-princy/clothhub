const mongoose = require('mongoose')

const clothSchema = new mongoose.Schema({
    
  title: String,
  brand: String,
  price: Number,
  image: String,
});

const Cloth = mongoose.model("Cloth", clothSchema);
