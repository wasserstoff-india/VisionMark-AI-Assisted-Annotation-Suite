const express = require('express')
const router = express.Router()
const {uploadImageAndAnnotate,manualAnnotate,reviewImageAnnotation} = require('../../../controllers/annotation.controller')
const {authenticateAdmin,authenticateUser} = require('../../../middlewares/authentication.middleware')
const {fetchImageById,fetchImagesOfUser,fetchAllImages,fetchImagesWithStatus} = require('../../../controllers/image.controller')
const {exportData} = require('../../../controllers/export.controller')


router.route('/image').post(authenticateUser,uploadImageAndAnnotate)
    .get(authenticateUser,fetchImagesOfUser)

router.route('/image/:id').post(authenticateUser,manualAnnotate).get(authenticateUser,fetchImageById)

router.get('/images',authenticateAdmin,fetchAllImages)

router.get('/images',authenticateAdmin,fetchImagesWithStatus)

router.post('/review/:id',authenticateAdmin,reviewImageAnnotation)

router.get('/exportdata/:type',authenticateAdmin,exportData)


module.exports=router