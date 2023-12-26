const Messages = require("../model/message");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Messages.create({
      sender: from,
      users: [from, to],
      message: { text: message },

    });
    if (data) return res.json({ msg: "Message added successfully." });

    return res.json({ msg: "failed to send message to the db" });
  } catch (err) {
    next(err);
    console.log("ERR at addMessage controllers,", err);
  }
};

const getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt:msg.createdAt
      };
    });
    res.json(projectMessages)
  } catch (err) {
    console.log("err ", err);
    next(err);
  }
};

module.exports = { addMessage, getAllMessage };
