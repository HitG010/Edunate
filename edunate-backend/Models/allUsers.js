const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const AllUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    
});

AllUserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err) {
        next(err);
    }
});


module.exports = mongoose.model('All', AllUserSchema);