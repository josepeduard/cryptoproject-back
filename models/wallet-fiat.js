const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const walletFiatSchema = new Schema({
  owner: {type: ObjectId,
    ref:'User'},
  quantity: Number,
  currency: String
});

const WalletFiatWallet = mongoose.model('WalletFiatWallet', walletFiatSchema);

module.exports = WalletFiatWallet;


