const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  titre: String,
  description: String,
  ingredients: Array,
});
module.exports = mongoose.model("Recipes", recipeSchema);
