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
  router.put('/withdraw',isLoggedIn(),(req, res, next) => {
    const {_id} = req.session.currentUser
    const {withdraw} = req.body
    console.log("hola",req.body.withdraw)
    User.findByIdAndUpdate({_id}, {$inc: {Euro: -withdraw}})
    .then((data)=>{
        console.log(req.body.withdraw)
        res.json(data);
        res.status(200)
    })    
});
  
router.put('/deposit',isLoggedIn(),(req, res, next) => {
    const {_id} = req.session.currentUser
    const {deposit} = req.body
    console.log("hola",req.body.deposit)
    User.findByIdAndUpdate({_id}, {$inc: {Euro: deposit}})
    .then((data)=>{
        console.log(req.body.deposit)
        res.json(data);
        res.status(200)
    })    
});



module.exports = router;
