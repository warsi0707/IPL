const {Router} = require("express")
const uesrRouter = Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../Databse/DB")
const { USER_JWT_SECRETE } = require("../config")

const TEAM = ["RCB", "KKR", "DC", "PBKS", "SRH", "RR","LSG", "MI"]

uesrRouter.get("/",(req, res) =>{
    res.json({
        message: "Hello world"
    })
})
uesrRouter.post("/register",async(req, res) =>{
    const {email, name, password} = req.body;

   try{
    if(!email || !name ||!password){ //custom input validation
        return res.status(404).json({
            errorMessage: "All Input required"
        })
    }
    const ExistUser = await User.findOne({email:email}); //finding existing user in db
    if(ExistUser){
        return res.status(404).json({
            errorMessage: "User already exist"
        })
    }
    const iplTeam = TEAM[Math.floor(Math.random() * TEAM.length)]
    const HashPassword = await bcrypt.hash(password, 5) //hashing password
    const NewUser = await User.create({
        email: email,
        name: name,
        password: HashPassword,
        assignTeam: iplTeam
    })
    return res.json({
        message: "Signin Success",
        NewUser: NewUser
    })
   }catch(error){
    res.status(404).json({
        errorMessage: error.message
    })
   }

 


})
uesrRouter.post("/signin",async(req, res) =>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(404).json({
                errorMessage: "*All Input required"
            })
        }
        const ExistingUser = await User.findOne({email: email})
        const user = ExistingUser && ExistingUser.password ? await bcrypt.compare(password, ExistingUser.password): false
        if(!user){
            return res.status(404).json({
                errorMessage: `${email} not found or incorrect password`
            })
        }
        if(user){
            const accessToken = await jwt.sign({
                userId: user._id
            },USER_JWT_SECRETE)
            
            res.cookie("accessToke", accessToken,{
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
                secure:process.env.NODE_ENV==="Development"?false:true,
            })
            return res.json({
                messge: "Login Success",
                token: accessToken
            })
        }else{
            return res.status(404).json({
                errorMessage: "Error while signing"
            })
        }

    }catch(error){
        res.status(404).json({
            errorMessage: error.message
        })
    }
})
uesrRouter.post("/logout",(req, res) =>{
    res.clearCookie("accessToken", USER_JWT_SECRETE)
    res.json({
        message: "Log out success"
    })
})

module.exports = {
    uesrRouter
}