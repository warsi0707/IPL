const Router = require("express")
const { Product } = require("../Databse/DB")
const productRouter = Router()


const iplProduct = [
    {
      "name": "Chennai Super Kings Jersey",
      "description": "Official Chennai Super Kings team jersey for the 2024 IPL season.",
      "price": 2499,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4Axnz85MTLGfEcAIMoyhIX3qO1Cn9wmwHw&s"
    },
    {
      "name": "Mumbai Indians Cap",
      "description": "Classic Mumbai Indians cap with team logo and adjustable strap.",
      "price": 599,
      "imageUrl": "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/N8Ek9rHuS-MI-Match-Cap.jpeg"
    },
    {
      "name": "Royal Challengers Bangalore Bat",
      "description": "RCB-branded cricket bat made from high-quality English willow.",
      "price": 3499,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiS67P7okEEbaPIPUjQfl22iVqY1GTSCiCTA&s"
    },
    {
      "name": "Kolkata Knight Riders Hoodie",
      "description": "Comfortable KKR hoodie with team emblem and bold graphics.",
      "price": 1999,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_QZ13-w-Y1PXudlUnSdmeahWuJQDl7NX8uQ&s"
    },
    {
      "name": "Delhi Capitals Water Bottle",
      "description": "Stainless steel water bottle with Delhi Capitals logo.",
      "price": 799,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9EdpKSkkjyYMbrZ9iPdIlgpEiAXx4SV3yHQ&s"
    },
    {
      "name": "Sunrisers Hyderabad Backpack",
      "description": "Durable backpack with Sunrisers Hyderabad branding, ideal for travel and sports.",
      "price": 1299,
      "imageUrl": "https://m.media-amazon.com/images/I/51D1phiKXfL.jpg"
    },
    {
      "name": "Punjab Kings Mug",
      "description": "Ceramic mug with Punjab Kings logo, perfect for your morning coffee.",
      "price": 349,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAdmYKDckFQAd1Qpd7lGneDnsjUjITuLP7A&s"
    },
    {
      "name": "Gujarat Titans Keychain",
      "description": "Stylish keychain featuring the Gujarat Titans logo.",
      "price": 199,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzAxAyYiH6ZPrf5e59j7y49Zimy1EsaM2Sw&s"
    },
    {
      "name": "Lucknow Super Giants Notebook",
      "description": "Hardcover notebook with Lucknow Super Giants branding, ideal for notes and journaling.",
      "price": 499,
      "imageUrl": "https://m.media-amazon.com/images/I/61MRGYUnFTL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      "name": "IPL Trophy Replica",
      "description": "Miniature replica of the IPL trophy, made from high-quality materials.",
      "price": 1499,
      "imageUrl": "https://5.imimg.com/data5/SELLER/Default/2022/1/XW/ZK/TB/133629531/6.jpg"
    },
    {
      "name": "Chennai Super Kings Socks",
      "description": "Pair of comfortable and durable CSK-branded socks.",
      "price": 299,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS86MkWDcleXFs_ElH0RlfdJ7PajCzDGfWY9Q&s"
    },
    {
      "name": "Mumbai Indians Phone Case",
      "description": "Premium phone case with Mumbai Indians logo and vibrant design.",
      "price": 699,
      "imageUrl": "https://i0.wp.com/www.deltastore.in/wp-content/uploads/2020/10/Untitled-design-2020-10-13T215033.139.png?fit=1080%2C1080&ssl=1"
    },
    {
      "name": "Royal Challengers Bangalore Flag",
      "description": "RCB team flag made of high-quality fabric, perfect for match days.",
      "price": 599,
      "imageUrl": "https://m.media-amazon.com/images/I/71ebW42lQGS.jpg"
    },
    {
      "name": "Kolkata Knight Riders Scarf",
      "description": "Warm and stylish KKR-branded scarf for chilly match evenings.",
      "price": 399,
      "imageUrl": "https://5.imimg.com/data5/SELLER/Default/2023/3/293727196/NG/TZ/NW/154022460/ipl-kkr-jersey-500x500.JPG"
    },
    {
      "name": "Delhi Capitals Wristband",
      "description": "Set of 2 silicone wristbands with Delhi Capitals team branding.",
      "price": 149,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCt9GCdyD8bbj_nTC88IEJ3hVNKlkrd-iVgA&s"
    },
    {
      "name": "Sunrisers Hyderabad Tumbler",
      "description": "High-quality tumbler with Sunrisers Hyderabad logo and vibrant design.",
      "price": 899,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGqAY6Nvmio-0ACxrNCdrXvO45bXRm7fRgw&s"
    },
    {
      "name": "Punjab Kings Coasters",
      "description": "Set of 4 coasters with Punjab Kings branding, ideal for home or office use.",
      "price": 499,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJmXtOV71dmVIZ2vWvhQjeoKXUdpWW-yjRA&s"
    },
    {
      "name": "Gujarat Titans Umbrella",
      "description": "Compact umbrella with Gujarat Titans logo, perfect for rain or shine.",
      "price": 899,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FjH0eN6RgSzHFXyaA5uRNY_tvcmX6FimzQ&s"
    },
    {
      "name": "Lucknow Super Giants Wall Poster",
      "description": "High-quality wall poster featuring Lucknow Super Giants team graphics.",
      "price": 299,
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjPHOBcX3vR6LhQXBbBXazzuea7S3IhDusA&s"
    },
    {
      "name": "IPL 2024 Match Ball",
      "description": "Official IPL-branded cricket ball, ideal for practice or display.",
      "price": 999,
      "imageUrl": "https://i0.wp.com/iplwinnerslist.in/wp-content/uploads/2024/02/kookaburra-cricket-ball_11a29de5e.png?fit=800%2C640&ssl=1"
    }
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
            errorMessage: error.message
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
          errorMessage: error.message
      })
  }
})
productRouter.post("/insert",async(req, res) =>{
    // const {name, description, price, iamgeUrl} = req.body;
    const newProduct = await Product.insertMany(iplProduct)
    res.json({
        products: newProduct
    })
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

module.exports = {
    productRouter
}