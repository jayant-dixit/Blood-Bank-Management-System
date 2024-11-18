import mongoose from 'mongoose';

const acceptorSchema = new mongoose.Schema({
    // Basic Information about the Acceptor
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    bloodGroup: { 
        type: String, 
        enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'], 
        required: true 
    },
    
    // Medical Information
    medicalDetails: {
        hospitalName: { type: String, required: true },  // Hospital where the patient is admitted
        doctorName: { type: String, required: true },    // Name of the doctor treating the patient
        doctorNoc: { 
            type: String, 
            required: true, 
            description: "Doctor's No-Objection Certificate (NOC)" 
        },
        doctorContact: { type: String, required: true },  // Contact number of the doctor
        admissionDate: { type: Date, default: Date.now },  // Date of admission to the hospital
        treatmentDetails: { type: String },                // Details about ongoing treatment
    },

    // Request History (tracking the requests for blood)
    requestHistory: [
        {
            bloodGroup: { type: String, required: true },
            requestDate: { type: Date, default: Date.now },
            urgencyLevel: { type: String, enum: ['Normal', 'Urgent', 'Critical'], default: 'Normal' },
            status: { type: String, enum: ['Pending', 'Fulfilled', 'Rejected'], default: 'Pending' },
            donorAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the donor
            deliveryDate: { type: Date }  // Date when blood is delivered
        }
    ],
},{timestamps: true});

// Index for location-based queries if needed (optional)
acceptorSchema.index({ location: "2dsphere" });

const Acceptor = mongoose.model('Acceptor', acceptorSchema);

export default Acceptor;
