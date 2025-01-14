
const InputValidation =(schema) =>(req, res, next)=>{
    const validationSuccess = schema.safeParse(req.body)
    if(!validationSuccess.success){
        return res.status(404).json({
            message: validationSuccess.error.issues.map((item) => item.message)
        })
    }
    req.body= validationSuccess.data
    next()
}

module.exports = InputValidation
