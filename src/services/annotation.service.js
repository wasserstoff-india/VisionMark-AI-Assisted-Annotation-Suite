const path = require("path");
const vision = require("@google-cloud/vision");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Image = require("../models/image.model");

module.exports.automaticAnnotate = async (imagePath) => {
  try {
    const APIKeyPath = path.join(path.resolve(), "APIKey.json");
    const client = new vision.ImageAnnotatorClient(APIKeyPath);
    const [result] = await client.objectLocalization(imagePath);
    // Extract label annotations
    const objects = result.localizedObjectAnnotations;
    // Process label annotations
    const labelsWithCoordinates = objects.map((object) => {
      const label = object.name; // Label name
      const confidence = object.score; // Confidence score
      const vertices = object.boundingPoly.normalizedVertices; // Bounding box vertices

      // Calculate bounding box coordinates
      const coordinates = vertices.map((vertex) => ({
        x: vertex.x * width,
        y: vertex.y * height,
      }));

      return { label, confidence, coordinates };
    });
    return labelsWithCoordinates;
  } catch (err) {
    next(
      new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error")
    );
  }
};

module.exports.createImage = async (userId, image, label) => {
  const newImage = await Image.create({ userId, image, annotations: [label] });
  return newImage;
};

module.exports.fetchImage = async (imageId) => {
  const image = await Image.findById(imageId);
  return image;
};

module.exports.manualAnnotation = async (imageId, annotation) => {
  const imageExits = await Image.exists({ _id: imageId });
  if (!imageExits) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Image doesn't exits with provided imageId."
    );
  }
  const image = await Image.findById(imageId);
  image.annotations.push(annotation);
  image.save();
  return image;
};

module.exports.reviewImageAnnotation = async (imageId, status) => {

  try {

    const imageExits = await Image.exists({ _id: imageId });

    if (!imageExits) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Image does not exists with provided imageId."
      );
    }

    const image = await Image.findByIdAndUpdate(
      imageId,
      { $set: { status: status } },
      { new: true }
    );
    return image;
  } catch (err) {
    next(err);
  }
};
