/**
 * Async Handler for promises with HOC
 * @param {*} requestHandler 
 * @returns 
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

module.exports = asyncHandler