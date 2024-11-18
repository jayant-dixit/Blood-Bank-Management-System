import mongoose from "mongoose";

const bloodMatchSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodRequest', required: true },
    matchStatus: { type: String, enum: ['Matched', 'Not Matched'], default: 'Not Matched' },
    matchDate: { type: Date, default: Date.now },
});

const BloodMatch = mongoose.model('BloodMatch', bloodMatchSchema);

export default BloodMatch;
