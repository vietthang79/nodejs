const mongoose = require ('mogoose');
const Schema = mongoose.Schema;

const UserOTPschema = new Schema ({
    userID : String,
    OTPcode : String,
    createAT : Date,
    expiresAT : Date,
})

const UserOTPvertication = mongoose.model(
    "UserOTPvertication",UserOTPschema
);
module.exports = UserOTPvertication;