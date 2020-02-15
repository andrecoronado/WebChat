const Message = require('../models/message-model')

createMessage = async (req, res) => {
    delete req.body._id
    const message = new Message({
        ...req.body
    })
    try {
        await message.save()
        res.status(201).send(message)
    } catch (e) {
        res.status(400).send(e)
    }
}

getMessages = async (req, res) => {
    try {
        const messages = await Message.find({})
        res.send(messages)
    } catch (e) {
        res.status(500).send()
    }
}

updateMessage = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['liked']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const message = await Message.findOne({ _id: req.params.id})

        if (!message) {
            return res.status(404).send()
        }

        updates.forEach((update) => message[update] = req.body[update])
        await message.save()
        res.send(message)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    createMessage,
    getMessages,
    updateMessage
}