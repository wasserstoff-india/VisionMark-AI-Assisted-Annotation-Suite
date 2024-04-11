const Image = require("../models/Image");

// Assuming Request can be changed to three statuses
const REQUEST_STATUS = {
  PENDING: {
    id: 1,
    key: "PENDING",
  },
  APPROVED: {
    id: 2,
    key: "APPROVED",
  },
  REJECTED: {
    id: 3,
    key: "REJECTED",
  },
};

// Review images controller for Admin user
const reviewImages = async (req, res) => {
  try {
    const images = await Image.find({ requestStatus: "PENDING" }).sort({
      updatedAt: -1,
    });
    if(!images.length){
      return res.status(404).json({error : "Pending requests not found"});
    }
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Approve and reject request for Admin user
// both for reject and approve
const handleRequests = async (req, res) => {
  try {
    const requestedImage = await Image.findOne({ _id: req.body.id });
    if (!requestedImage)
      return res.status(404).json({ error: "Image is not available" });
    const { requestStatus } = requestedImage;
    if (
      !Object.values(REQUEST_STATUS).find((data) => requestStatus === data.key)
    ) {
      return res
        .status(409)
        .json({ error: "Request can either be rejected or approved" });
    }
    if (requestStatus !== REQUEST_STATUS["PENDING"].key) {
      //Assuming status can can be changed once Approved or rejected
      return res
        .status(409)
        .json({ msg: "Request Status is already Approved or Rejected" });
    }
    if (requestedImage) {
      const updatedRequestImage = await Image.findOneAndUpdate(
        { _id: req.body.id },
        { $set: { requestStatus: req.body.requestStatus } },
        { new: true }
      );
      return res.status(200).json(updatedRequestImage);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { reviewImages, handleRequests };
