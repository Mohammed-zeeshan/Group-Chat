const Chats = require('../models/chats');
const SignUp = require('../models/signup');

exports.postMessages = async (req, res, next) => {
    const message = req.body.message;
    const signupId = req.user.id;
    try {
        await SignUp.findAll({where: {id: signupId}}).then((uname) => {
            const userName = uname[0].name;
            Chats.create({message, userName, signupId}).then((message) => {
                res.status(201).json(message);
            }).catch((err) => {
                console.log(err);
            })
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getMessages = async (req, res, next) => {
    await Chats.findAll().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        console.log(err);
    })
}
