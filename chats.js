const Chats = require('../models/chats');
const SignUp = require('../models/signup');

exports.postMessages = async (req, res, next) => {
    const message = req.body.message;
    const signupId = req.user.id;
    await Chats.create({ message, signupId }).then((message) => {
        SignUp.findAll({where: {id: req.user.id}}).then((uname) => {
            return res.status(201).json({message, uname});
        })
    }).catch((err) => {
        console.log(err);
    })
}

exports.getMessages = async (req, res, next) => {
    await Chats.findAll().then((data) => {
        return SignUp.findAll({where: {id: data[0].name}}).then((uname) => {
            res.status(201).json(data);
        })
    }).catch((err) => {
        console.log(err);
    })
}
