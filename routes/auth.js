const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const WalletCryptoWallet = require('../models/wallet-crypto')
const WalletFiatWallet = require('../models/wallet-fiat')


const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post('/login', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
      username
    })
    .then((user) => {
      if (!user) {
        const err = new Error('Not Found');
        err.status = 404;
        err.statusMessage = 'Not Found';
        next(err)
      }
      if (bcrypt.compareSync(password, user.password)) {
        delete user.password;
        console.log(user);
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        const err = new Error('Unauthorized');
        err.status = 401;
        err.statusMessage = 'Unauthorized';
        next(err);
      }
    })
    .catch(next);
});


router.post('/signup', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
      username
    }, 'username')
    .then((userExists) => {
      if (userExists) {
        const err = new Error('Unprocessable Entity');
        err.status = 422;
        err.statusMessage = 'username-not-unique';
        next(err);
      }


      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass,
      });

      newUser.save().then((user) => {
        req.session.currentUser = user
        const newWalletCryptoWallet = WalletCryptoWallet({
          owner: user._id,
          
        })

        const newWalletFiatWallet = WalletFiatWallet({
          owner: user._id,
          
        })

        newWalletCryptoWallet.save().then(()=>{
          return newWalletFiatWallet.save()
        }).then(()=>{
          res.json(user);
        })

      });
    })
    .catch(next);
});

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
