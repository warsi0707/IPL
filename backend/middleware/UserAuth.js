const jwt = require("jsonwebtoken")
const { USER_JWT_SECRETE } = require("../config")

function authUser(req, res, next) {
    const token = req.cookies.token //accessing token from cookies
    try {
        if (!token) {
            return res.status(404).json({
                message: "Login required!"
            })
        }
        const decode = jwt.verify(token, USER_JWT_SECRETE) //verifying token and user secret
        if (decode) {
            req.user = decode
            next()
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {
    authUser
}