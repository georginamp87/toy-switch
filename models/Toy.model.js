const { Schema, model } = require("mongoose");
let defaultImg ="https://image.freepik.com/vektoren-kostenlos/weihnachten-spielt-hintergrund-im-flachen-design_23-2148350472.jpg";

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
    default:[defaultImg]
  },
  category: {
    type: String,
    ENUM: ['Toy', 'Board Game', 'Teddy Bear', 'Puzzle', 'Sports', 'Books', 'Video games', 'other'],
    require: true
  },
  city: {
    type: String,
    ENUM: ['Amsterdam', 'Berlin', 'Frankfurt', 'Paris','other'],
    require: true
  },
  ageRange: {
    type: String,
    ENUM: ['baby', 'toddler', '3 to 6 years old', '7 to 10 years old', '10 years old +'],
  },
  switchMode: {
    type: String,
    ENUM: ['switch', 'gift', 'temporary-switch'],
  }
});

const ToyModel = new model("toy", toySchema);

module.exports = ToyModel;