const {
  Schema,
  model
} = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  photo: String,
  city: {
    type: String,
    enum: ['Amsterdam', 'Berlin', 'Frankfurt', 'Paris', 'other'],
    require: true
  }
});

const UserModel = new model("user", userSchema);

module.exports = UserModel;