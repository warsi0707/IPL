const Router = require("express")
const { Product, User } = require("../Databse/DB")
const { authUser } = require("../middleware/UserAuth")
const productRouter = Router()


const iplProduct = [
  // dummy data
  ]

productRouter.get("/",async(req, res) =>{
    try{
        const Products = await Product.find({})
        if(Products.length === 0){
            return res.json({
                message: "No product listed"
            })
        }else{
            return res.json({
                products: Products
            })
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
productRouter.get("/item",async(req, res) =>{
  try{
      const Products = await Product.find({}).limit(6)
      if(Products.length === 0){
          return res.json({
              message: "No product listed"
          })
      }else{
          return res.json({
              products: Products
          })
      }
  }catch(error){
      res.status(404).json({
          message: error.message
      })
  }
})
productRouter.get("/:id",async(req, res) =>{
  const {id} = req.params;

  try{
    const item = await Product.findById({_id:id})
    if(item){
      return res.json({
        item: item
      })
    }
  }catch(error){
    res.status(404).json({
      message: error.message
    })
  }
})

productRouter.post("/insert",async(req, res) =>{
  const newProduct = await Product.insertMany(iplProduct)
  res.json({
      products: newProduct
  })
})
module.exports = {
    productRouter
}