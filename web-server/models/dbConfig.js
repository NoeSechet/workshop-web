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