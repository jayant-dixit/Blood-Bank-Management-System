import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import User from "../../models/user.model.js";
import BloodBank from "../../models/bloodBank.model.js";

// Find nearby donors and blood banks
const getNearbyEntities = async (req, res, next) => {
    const { latitude, longitude, radius = 5000, bloodGroup } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json(ApiResponse.error(400, 'Latitude and longitude are required'));
    }
    try {
        const userLocation = {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)], // MongoDB requires [longitude, latitude]
        };

        const radiusInMeters = parseInt(radius, 10); // Convert radius to integer

        // Donors query using $geoNear
        const donorPipeline = [
            {
                $geoNear: {
                    near: userLocation,
                    distanceField: "distance",
                    maxDistance: radiusInMeters,
                    spherical: true,
                },
            },
            {
                $match: bloodGroup
                    ? { bloodGroup: bloodGroup } // Filter by blood group if provided
                    : {},
            },
            {
                $project: {
                    name: 1,
                    bloodGroup: 1,
                    location: 1,
                    distance: 1, // Include distance for sorting on frontend
                },
            },
        ];

        const bloodBankPipeline = [
            {
                $geoNear: {
                    near: userLocation,
                    distanceField: "distance",
                    maxDistance: radiusInMeters,
                    spherical: true,
                },
            },
            {
                $project: {
                    name: 1,
                    contactNumber: 1,
                    location: 1,
                    distance: 1,
                },
            },
        ];

        // Execute aggregation pipelines
        const donors = await User.aggregate(donorPipeline);
        const bloodBanks = await BloodBank.aggregate(bloodBankPipeline);

        res.status(200).json(ApiResponse.success(200, "Nearby entities fetched successfully", { donors, bloodBanks }));
    } catch (error) {
        console.error("Error is",error);
        next(new ApiError(500, "Internal Server Error"));
    }
};

export default getNearbyEntities;