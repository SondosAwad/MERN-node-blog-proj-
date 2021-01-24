
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        minlength: 3,
        maxLength: 140,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        maxLength: 140,
    },
    dob: Date,

    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]

},
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },
    }
);


userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
        return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});



//comparing pwd for login
userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema); //creating collection //mounting model
// ready to go!

module.exports = User;