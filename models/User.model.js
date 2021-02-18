const {
  Schema,
  model
} = require("mongoose");

let defaultProfileImg="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"

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
  photo: {
    type: String,
    default: defaultProfileImg,
  },
  city: {
    type: String,
    ENUM: ['Amsterdam', 'Augsburg','Berlin', 'Frankfurt','Ljubljana', 'Madrid', 'Munich','Paris','Warsaw'],
    require: true
  }
});

const UserModel = new model("user", userSchema);

module.exports = UserModel;