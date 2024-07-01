const Chats = require('../models/chats');
const Group = require('../models/group');
const SignUp = require('../models/signup');
const Usergroup = require('../models/usergroup');

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

exports.creategroup = async (req, res, next) => {
    const groupname = req.body.groupname;
    const signupId = req.user.id;
    await Group.create({name: groupname}).then((data) => {
        console.log(data.id);
        Usergroup.create({signupId: signupId, groupId: data.id}).then(() => {
            return res.status(201).json(data);
        })
    }).catch((err) => {
        console.log(err);
    });
}

exports.grouplist = async (req, res, next) => {
    const signupId = req.user.id;
    await SignUp.findAll({
        where: {id: signupId},
        include: Group,
    }).then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        console.log(err);
    })
}
