const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

// -------------------- SET UP DATABASE + LAUNCH IT --------------------
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect(
    'mongodb://localhost:27017/workshop-web',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err)
            console.log("MongoDB connection error:" + err);
        console.log("MongoDB connected");
    }
)
// ----------------------------------------------------------------------

app.use(bodyParser.json());

// const routeUser = require('./routes/userRoute');
// app.use('/user', routeUser);

const { UserModel } = require('./models/userModel');

const routeUser = express.Router();

routeUser.get('/', (req, res) => {
    UserModel.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else if (!users) {
            return res.status(404).json({ success: false, error: 'No users found' })
        } else {
            return res.status(200).json({ success: true, users: users })
        }
    })
})

routeUser.post('/add', (req, res) => {
    const newUser = new UserModel(
        {
            name: req.body.name,
            hobby: req.body.hobby
        }
    )
    newUser.save((error, documents) => {
        if (error) {
            return res.status(400).send(error)
        } else {
            return res.status(200).json({ user: documents.name })
        }
    })
})

routeUser.delete('/delete', (req, res) => {
    UserModel.deleteOne({ _id: req.body.id }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        } else {
            return res.status(200).json({ success: true, deleted: req.body.id })
        }
    })
})

routeUser.post('/edit', (req, res) => {
    if (!req.body.id || !req.body.hobby) {
        return res.status(400).json({ error: "invalid arguments" })
    }

    UserModel.findOne({ _id: req.body.id }, (err, user) => {
        if (err) {
            res.status(400).json({ err, message: "User not found" })
        }
        // user.name = req.body.name
        user.hobby = req.body.hobby
        user.save().then(
            () => {
                return res.status(200).json({ success: true, message: "User's hobby updated"})
            }
        ).catch(err => {
            return res.status(404).json({ success: false, err, message: "Update failed"})
        })
    })
})

app.use('/user', routeUser)

app.listen(process.env.PORT || 8080, () => console.log('Server started'));