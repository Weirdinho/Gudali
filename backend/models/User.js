const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    courses: [
        { 
            courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
            progress: { type: Number, default: 0 },
        },
    ],
    subscription: { type: Boolean, default: false },
    role: { type: String, default: 'student' },
});

module.exports = mongoose.model('User', userSchema);
