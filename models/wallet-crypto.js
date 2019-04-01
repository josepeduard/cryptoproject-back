const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const walletCryptoSchema = new Schema({
  owner: {type: ObjectId,
    ref:'User'},
    quantity: {
      type: Number, 
      default: 0,
    },
  currency: {
    type: String, 
    // default:,
  }
});

const WalletCryptoWallet = mongoose.model('WalletCryptoWallet', walletCryptoSchema);

module.exports = WalletCryptoWallet;


