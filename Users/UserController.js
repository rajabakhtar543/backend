const { hashpassword, comparePassword } = require("../config/helper/authhelper")
const { UserSchema } = require("./usersModel")
const JWT = require('jsonwebtoken')

const registercontroller =async (req,res)=>{
    try {
        const {name,email,password,address} = req.body
        //validation 
        if(!name){
            return res.send({error:'Name Is Required'})
        }
        if(!email){
            return res.send({error:'Email Is Required'})
        }
        if(!password){
            return res.send({error:'Password Is Required'})
        }
        if(!address){
            return res.send({error:'Address Is Required'})
        }
        //check user 
        const Existinguser = await UserSchema.findOne({email})
        //existing User
        if(Existinguser){
            return   res.status(200).send({
                success:true,
                message : 'Already Registered Please Login'
            })

            }
            
        
        const hashedpassword = await hashpassword(password);
        const user = await new UserSchema({name,email,address,password:hashedpassword}).save()
        res.status(200).send({
            success:true,
            message:"User registered successfully ",user
        })
     

               
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message :`error in registration ${error}`
        })
    }

}
const logincontroller = async(req,res) => {
    try {
          const {email,password} = req.body;
          if(!email || !password){
            return res.status(404).send({
                success : false,
                message : 'Invalid Email And Password'
            })
          }
          const user = await UserSchema.findOne({email})
      
  
          if(!user){
            return res.status(404).send({
                success :false,
                message: 'Invalid Email'
            })
          }
 

      const compare = await comparePassword(password,user.password)
      if (!compare){
        res.status(200).send({
            success : false,
            message:"paasword is invalid"
        })

      }
      // token
     const token = JWT.sign({_id: user._id}, process.env.SECRET_KEY,{expiresIn:'7d'})
     res.status(200).send({
       success:true,
       message : 'Login Succesfully',
       user:{"_id": user._id,
        'name':user.name,
              'email':user.email,
              "address":user.address,
              "role":user.role

           
       },token

     })
          

        
    } catch (error) 
    {
        console.log(error)
    
    }

}

module.exports = {registercontroller,logincontroller}