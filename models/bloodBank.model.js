import mongoose from "mongoose";

const bloodBankSchema = new mongoose.Schema({
    // Basic Information about the Blood Bank
    name: { type: String, required: true },
    location: {
        type: {
            type: String, // GeoJSON type
            enum: ["Point"],
            default: "Point"
        },
        coordinates: [Number], // [longitude, latitude]
    },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bloodBankId: { type: String, required: true, unique: true },

    // Blood Inventory (tracked by blood group)
    bloodInventory: {
        A_plus: { type: Number, default: 0 },
        B_plus: { type: Number, default: 0 },
        AB_plus: { type: Number, default: 0 },
        O_plus: { type: Number, default: 0 },
        A_minus: { type: Number, default: 0 },
        B_minus: { type: Number, default: 0 },
        AB_minus: { type: Number, default: 0 },
        O_minus: { type: Number, default: 0 },
    },

    // Blood Request History (from acceptors)
    requestHistory: [
        {
            acceptorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Acceptor
            bloodGroup: { type: String, required: true },
            requestDate: { type: Date, default: Date.now },
            urgencyLevel: { type: String, enum: ['Normal', 'Urgent', 'Critical'], default: 'Normal' },
            status: { type: String, enum: ['Pending', 'Fulfilled', 'Rejected'], default: 'Pending' },
            donorAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }, // Reference to the donor fulfilling the request
            deliveryDate: { type: Date }, // When blood is delivered to the acceptor
        }
    ],

    // Scheduling Donation (to match acceptor needs)
    scheduledDonations: [
        {
            donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Donor ID
            bloodGroupRequired: { type: String, required: true },
            scheduledDate: { type: Date, required: true },
            urgencyLevel: { type: String, enum: ['Normal', 'Urgent', 'Critical'], default: 'Normal' },
            donationStatus: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
        }
    ],
},{timestamps:true});

// Geo-index to support location-based queries
bloodBankSchema.index({ location: "2dsphere" });

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

export default BloodBank;
