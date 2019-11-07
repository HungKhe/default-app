const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notify', {
    useNewUrlParser: true,
    useFindAndModify: false
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var modalSchema = new mongoose.Schema({
    shop_domain: String,
    access_token: String,
    refresh_token: String,
    list_notify: [
        {
            _id: { type: mongoose.Schema.ObjectId, auto: true },
            notifyName : String,
            notifyType : String,
            notifyIcon : String,
            notifyLink : String,
            notifyContent : String,
            notifyLogin: Boolean,
            notifyStatus: Boolean,
            notifyCreateTime: String
        }
    ]
})
module.exports = mongoose.model('notify', modalSchema)