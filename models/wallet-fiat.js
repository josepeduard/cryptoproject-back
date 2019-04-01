const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const walletFiatSchema = new Schema({
  owner: {type: ObjectId,
    ref:'User'},
  quantity: {
    type: Number, 
    default: 0
  },
  currency: {
    type: String, 
    default: "€",
  }
});

const WalletFiatWallet = mongoose.model('WalletFiatWallet', walletFiatSchema);

module.exports = WalletFiatWallet;


