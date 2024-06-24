const SignUp = require("../models/signup");
const bcrypt = require('bcrypt');

function stringValidator(string) {
    if (string == undefined || string.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  
  const postsignup = async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      if (
        stringValidator(name) ||
        stringValidator(email) ||
        stringValidator(password)
      ) {
        return res.json({ message: "Something is missing" });
      } 
      await SignUp.findAll({where: {email: email}}).then((data) => {
        if (data.length === 1) {
          res.status(201).json({message: "User already exist"});
        }
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
              res.status(201).json({message: 'Unable to create a user'});
            }
            SignUp.create({name, email, password: hash}).then(() => {
              res.status(201).json({message: 'Successfully created a user'});
            }).catch(err => {
              res.status(401).json(err);
            })
          })
        })
      })
    } catch (err) {
      res.status(500).json(err);
    }
  };
