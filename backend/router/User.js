const { Router } = require("express")
const uesrRouter = Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../Databse/DB")
const { USER_JWT_SECRETE } = require("../config")
const { authUser } = require("../middleware/UserAuth")

const TEAM = ["RCB", "KKR", "DC", "PBKS", "SRH", "RR", "LSG", "MI"]
//REGISTER ROUTE
uesrRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body;

    try {
        if (!email || !name || !password) { //custom input validation
            return res.status(404).json({
                message: "All Input required"
            })
        }
        const ExistUser = await User.findOne({email: email}); //finding existing user in db
        if (ExistUser) {
            return res.status(404).json({
                message: "User already exist"
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
            message:`Signup Success, Weolcome to ${iplTeam} world`,
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }




})
//SIGNIN ROUTE
uesrRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(404).json({
                message: "*All Input required"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "Bad Credentials"
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(404).json({
                message: "Incorrect password"
            })
        }
        const token = jwt.sign({
            id: user._id
        }, USER_JWT_SECRETE)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        return res.json({
            message: "Login Success",
            token: token
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//AUTHENTICATION ROUTE
uesrRouter.get("/auth", authUser, async (req, res) => {
    const { id } = req.user;
    try{
    const user = await User.findById(id)
    if(user){
        return res.json({
            authenticated: true
        })
    }else{
        return res.json({
            authenticated: false
        })
    }
    }catch(error){
        res.status(404).json({
            message: error.message,
            authenticated: false
        })
    }
    
})
//ADD TO CART ROUTE
uesrRouter.get("/items/:itemId", authUser, async (req, res) => {
    const { id } = req.user;
    const { itemId } = req.params;
    try {
        const findUser = await User.findById(id)
        if(!findUser){
            return res.status(404).json({
                message: "Login required"
            })
        }
        findUser.cart.push(itemId)
        await findUser.save()
        return res.json({
            message: "item added"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
// DELETE ITEM IN CART ROUTE
uesrRouter.get("/item/:itemId", authUser, async (req, res) => {
    const { id } = req.user;
    const { itemId } = req.params;
    try {
        const findUser = await User.findById(id)
        findUser.cart.pull(itemId)
        await findUser.save()
        return res.json({
            message: "item added"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//CART ALL ITEM ROUTE
uesrRouter.get("/carts",authUser,async(req, res)=>{
    const { id } =req.user;
    // try{
        const cart = await User.findById(id).populate("cart")

        if(cart.cart.length === 0 ){
            return res.status(404).json({
                message: "Empty Cart"
            })
        }
        return res.json({
            item: cart
        })
    // }catch(error){
    //     res.status(404).json({
    //         message: error.message
    //     })
    // }
})
uesrRouter.post("/buy",authUser,async(req, res)=>{
    
})
//LOGOUT ROUTE
uesrRouter.post("/logout",authUser, (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    })
    
    res.json({
        message: "Logout success"
    })
})

module.exports = {
    uesrRouter
}