const path = require("path");
const vision = require("@google-cloud/vision");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Image = require("../models/image.model");

/**
 * Service to run google cloud vision AI to annotate image
 * @param {*} imagePath 
 * @returns 
 */
module.exports.automaticAnnotate = async (imagePath) => {
  try {
    //Google API key path resolution
    const APIKeyPath = path.join(path.resolve(), "APIKey.json");
    //Initializing the AnnotatorClient with google credentials
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

/**
 * Service to create image data in mongoDB
 * @param {*} userId 
 * @param {*} image 
 * @param {*} label 
 * @returns 
 */
module.exports.createImage = async (userId, image, label) => {
  const newImage = await Image.create({ userId, image, annotations: [label] });
  return newImage;
};

/**
 * Service to fetch image data by imageId
 * @param {*} imageId 
 * @returns 
 */
module.exports.fetchImage = async (imageId) => {
  const image = await Image.findById(imageId);
  return image;
};

/**
 * Service to update the manual annotation in mongodb database
 * @param {*} imageId 
 * @param {*} annotation 
 * @returns 
 */
module.exports.manualAnnotation = async (imageId, annotation) => {
  const imageExits = await Image.exists({ _id: imageId });
  //Check for image existance
  if (!imageExits) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Image doesn't exits with provided imageId."
    );
  }
  //Fetching the image data, modifying it and saving to DB
  const image = await Image.findById(imageId);
  image.annotations.push(annotation);
  image.save();
  return image;
};

/**
 * Service to update the reviewed annotation in DB
 * @param {*} imageId 
 * @param {*} status 
 * @returns 
 */
module.exports.reviewImageAnnotation = async (imageId, status) => {
  try {
    const imageExits = await Image.exists({ _id: imageId });
    // Checking the image existance
    if (!imageExits) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Image does not exists with provided imageId."
      );
    }

    //Updating the image status in DB
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
