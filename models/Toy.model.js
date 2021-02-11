const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const toySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  photo: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    enum: ['Toy', 'Board Game', 'Teddy Bear', 'Puzzle', 'Sports', 'other'],
    require: true
  },
  ageRange: {
    type: String,
    enum: ['baby', 'toddler', '3 to 6 years old', '7 to 10 years old', '10 years old +'],
  },
  gender: {
    type: String, 
    enum: ['girl', 'boy', 'gender neutral']
  },
  switchMode: {
    type: String,
    enum: ['switch', 'gift', 'temporary loan']
  }
});

const Toy = new model("Toy", toySchema);

module.exports = Toy;
