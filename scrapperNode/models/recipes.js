const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  titre: String,
  description: String,
  ingredients: Array,
  etapes: Array,
});
module.exports = mongoose.model("Recipes", recipeSchema);
