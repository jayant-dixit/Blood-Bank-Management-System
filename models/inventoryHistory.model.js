import mongoose from "mongoose";

const inventoryHistorySchema = new mongoose.Schema({
    bloodBank: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodBank', required: true },
    bloodGroup: { type: String, required: true },
    quantityChange: { type: Number, required: true }, // Positive for addition, negative for removal
    reason: { type: String, required: true }, // Reason for change (e.g., donation, blood use)
    date: { type: Date, default: Date.now },
});

const InventoryHistory = mongoose.model('InventoryHistory', inventoryHistorySchema);

export default InventoryHistory;
