import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // Basic Information
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    bloodGroup: { type: String, required: true }, // E.g., A+, B+, O-, etc.
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    location: {
        type: { type: String, enum: ["Point"], required: true, default: "Point" },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
      },

    // Proof of Blood Group (document or image)
    bloodGroupProof: {
        type: String,  // Store the URL or file path of the proof
    },
    donationSchedules: [
        {
            bloodBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBank' },
            date: { type: Date, required: true },
            time: { type: String, required: true },
            notes: { type: String },
            status: { type: String, enum: ['Scheduled', 'Completed', 'Canceled'], default: 'Scheduled' },
        },
    ],

    // Donation History
    totalDonations: { type: Number, default: 0 },
    donationHistory: [
        {
            date: { type: Date },
            bloodGroup: { type: String },
            location: { type: String }, // Donor's location when donating
            bloodBankId: {type: mongoose.Schema.Types.ObjectId, ref: 'BloodBank'},
            status: { type: String, enum: ['Successful', 'Failed'], default: 'Successful' },
        }
    ],

    // Accepting Blood (if user is a patient)
    isAcceptor: { type: Boolean, default: false }, // If the user is also an acceptor
    acceptanceHistory: [
        {
            requestDate: { type: Date },
            bloodGroupRequired: { type: String },
            requestLocation: { type: String },
            status: { type: String, enum: ['Pending', 'Fulfilled', 'Rejected'], default: 'Pending' },
            donorAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the donor if assigned
        }
    ],

    // Eligibility for Donation (donor eligibility criteria)
    lastDonationDate: { type: Date }, // Last donation date
    eligibilityStatus: { type: Boolean, default: true }, // If the donor is eligible to donate

    // Rewards and Certification (for donors)
    rewards: {
        healthPoints: { type: Number, default: 0 },
        certificates: { type: [String], default: [] }, // Array of certificate URLs or IDs
    }
}, { timestamps: true });

// Geo-index to support location-based queries (for finding nearby donors)
userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);

export default User;
