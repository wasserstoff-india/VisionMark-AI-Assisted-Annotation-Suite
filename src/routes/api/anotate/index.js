const express = require('express')
const router = express.Router()
const {uploadImageAndAnnotate,manualAnnotate,reviewImageAnnotation} = require('../../../controllers/annotation.controller')
const {authenticateAdmin,authenticateUser} = require('../../../middlewares/authentication.middleware')
const {fetchImageById,fetchImagesOfUser,fetchAllImages,fetchImagesWithStatus} = require('../../../controllers/image.controller')


router.route('/image').post(authenticateUser,uploadImageAndAnnotate)
    .get(authenticateUser,fetchImagesOfUser)

router.route('/image/:id').post(authenticateUser,manualAnnotate).get(authenticateUser,fetchImageById)

router.get('/images',authenticateAdmin,fetchAllImages)

router.get('/images',authenticateAdmin,fetchImagesWithStatus)

router.post('/review/:id',authenticateAdmin,reviewImageAnnotation)


module.exports=router