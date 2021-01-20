const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
});

const UserModel = mongoose.model(
    "users",
    userSchema
);

module.exports = { UserModel };