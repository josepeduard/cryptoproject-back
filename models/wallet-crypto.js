const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const walletCryptoSchema = new Schema({
  owner: {type: ObjectId,
    ref:'User'},
  quantity: Number,
  currency: String
});

const WalletCryptoWallet = mongoose.model('WalletCryptoWallet', walletCryptoSchema);

module.exports = WalletCryptoWallet;


