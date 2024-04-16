const httpStatus = require('http-status')
const {exportData} = require('../services/export.service')
const asyncHandler = require('../utils/asyncHandler')
const path = require('path')
const fs = require('fs')

module.exports.exportData=asyncHandler(async (req,res)=>{
    const type=req.params.type
    await exportData(type)
    let fileName;
        let contentType;
    switch(type){
        case 'xml':
                fileName = 'xmlAnnotations.xml';
                contentType = 'text/xml';
                break;
        case 'csv':
                fileName = 'data.csv'
                contentType = 'text/csv';
                break;
        case 'json':
                fileName = 'data.json'
                contentType = 'application/json';
                break;
        default:
                next(err)
    }
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${path.join(path.resolve(), "src", "public", "export",fileName)}`);
        res.download(path.join(path.resolve(), "src", "public", "export",fileName))
})