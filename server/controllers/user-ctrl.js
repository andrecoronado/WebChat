const User = require('../models/user-model')

createUser = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token, "success": true })
    } catch (e) {
        res.status(400).send({e, "data": { "success": false, "token":"" }})
    }
}

getUserByName = async (req, res) => {
    const username = req.params.username
    try {
        
        const user = await User.findOne({ username })
        if (!user) {
            return res.send({user: {name: ""}, "success": false})
        }

        res.send({user, "success": true})
    } catch (e) {
        res.status(500).send()
    }
}

loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token, "success": true })
    } catch (e) {
        res.send({ e,  "data": { "success": false } })
    }
}

logoutUser = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserByName
}