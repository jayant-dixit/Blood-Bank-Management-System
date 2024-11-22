import BloodBank from "../../models/bloodBank.model.js";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";


const donationSchedule = async (req, res, next) => {
    try {
        const { _id } = req.user; // Assuming the donor is authenticated
        const { bloodBankId, date, time, notes } = req.body;

        if (!bloodBankId || !date || !time) {
            return res.status(400).json(ApiResponse.error(400, 'Blood bank ID, date, and time are required'));
        }

        const bloodBank = await BloodBank.findOne({bloodBankId});
        if (!bloodBank) {
            return res.status(404).json(ApiResponse.error(404, 'Blood bank not found'));
        }

        const scheduleDonation = await User.findByIdAndUpdate(
            _id,
            {
              $push: {
                donationSchedules: {
                  bloodBankId: bloodBank._id,
                  date,
                  time,
                  notes,
                },
              },
            },
            { new: true }
          );

          bloodBank.scheduledDonations.push({
            donorId: _id, // Donor ID
            bloodGroup: req.user.bloodGroup,
            scheduledDate: date,
            scheduledTime: time,
            notes
          });

          await bloodBank.save();

          if (!scheduleDonation) {
            return res.status(404).json(ApiResponse.error(404, 'Donor not found'));
          }

          return res.status(200).json(ApiResponse.success(200, 'Donation schedule successfully', scheduleDonation));

    } catch (error) {
        console.error(error);
        next(new ApiError(500, error.message));
    }
}

export default donationSchedule;