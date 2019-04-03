const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true    
  }, 
  password: {
    type: String,
    required: true    
  },
  Image: {
    type: String,   
    required: false
  },
  Euro:{
    type: Number,
    default: 0
  }, 
  Bitcoin:{
    type: Number,
    default: 0
  },
  Ethereum:{
    type: Number,
    default: 0
  },
  Litecoin:{
    type: Number,
    default: 0
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;