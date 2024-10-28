const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const paymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: String,
    status: { type: String, default: 'successful' },
});

module.exports = mongoose.model('Payment', paymentSchema);
