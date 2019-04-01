const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const WalletCryptoWallet = require('../models/wallet-crypto');
const Fiat = require('../models/wallet-fiat');

const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/', isLoggedIn(),(req, res, next) => {
    const {_id} = req.session.currentUser
    console.log(_id)
    User.findById({_id})
    .then((data)=>{
    res.json(data);
    res.status(200)
    })
  });
/*
router.post('/deposit', isLoggedIn(),(req, res, next) => {
    const {_id} = req.session.currentUser
    const deposit = req.params
    User.findByIdAndUpdate({_id}, {euro: {deposit}})
    .then((data)=>{
        res.json(data);
        res.status(200)
    })    
});*/

module.exports = router;
