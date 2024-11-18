import BloodBank from "../../models/bloodBank.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";


const donationSchedule = async (req, res) => {
    try {
        const { _id } = req.user; // Assuming the donor is authenticated
        const { bloodBankId, date, time, notes } = req.body;

        if (!bloodBankId || !date || !time) {
            return res.status(400).json(ApiResponse.error(400, 'Blood bank ID, date, and time are required'));
        }

        const bloodBank = await BloodBank.findById({bloodBankId});
        if (!bloodBank) {
            return res.status(404).json(ApiResponse.error(404, 'Blood bank not found'));
        }

        const scheduleDonation = await Donor.findByIdAndUpdate(
            donorId,
            {
              $push: {
                donationSchedules: {
                  bloodBankId,
                  date,
                  time,
                  notes,
                },
              },
            },
            { new: true }
          );

          if (!scheduleDonation) {
            return res.status(404).json(ApiResponse.error(404, 'Donor not found'));
          }

          return res.status(200).json(ApiResponse.success(200, 'Donation schedule successfully', scheduleDonation));

    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

export default donationSchedule;