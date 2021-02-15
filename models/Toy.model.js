const { Schema, model } = require("mongoose");

const toySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  myOwner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require:true
  },
  description: {
    type: String
  },
  photos: {
    type: [String],
    require: true,
  },
  category: {
    type: String,
    enum: ['Toy', 'Board Game', 'Teddy Bear', 'Puzzle', 'Sports', 'Books', 'Video games', 'other'],
    require: true
  },
  city: {
    type: String,
    enum: ['Amsterdam', 'Berlin', 'Frankfurt', 'Paris','other'],
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

const ToyModel = new model("toy", toySchema);

module.exports = ToyModel;