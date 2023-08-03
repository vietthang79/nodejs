const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    receiver_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message : {
        type : String,
        require: true
    }

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('chatUser', chatSchema);
module.exports = User;