const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  owner: onjectId,
  cantidad: number,
  currency: String
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;


