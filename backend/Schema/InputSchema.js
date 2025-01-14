const {z} = require("zod")


const Signup = z.object({
    email: z.string().email( "Must be email formate"),
    name: z.string().min(3, "Name required").max(50, "Name should be less"),
    password: z.string().min(4, "Password required").max(20,"Password should less")
})
const Signin = z.object({
    email: z.string().email("Must be email formate").min(3, "Must be email formate"),
    password: z.string().min(4, "Password required").max(20,"Password should less")
})
const Product = z.object({
    name: z.string().min(3, "Product name required").max(100, "Product name should be less"),
    description: z.string().min(3, "description required").max(100, "description should be less"),
    password: z.string().min(4, "Password required").max(20,"Password should less"),
    price: z.number().min(2,"Price required").max(10, "Max price"),
    imageUrl: z.string().min(2,"Should be image link")
})

module.exports = {
    Signin,
    Signup,
    Product
}