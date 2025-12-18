import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema= new mongoose.Schema(
    {
    name:{
        type: string,
        required: true,
        trim: true 
    },

    email:{
        type: string,
        required: true,
        unique: true,
        trim: true
    },

    password:{
        type: string,
        required: true,

    },

    role:{
        type: string,
        enum: ["ADMIN", "HR", "MANAGER", "EMPLOYEE"],
      default: "EMPLOYEE"
    },
    refreshToken:{
         type: string
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, { timestamps: true }
)

// PASSWORD HASHING
userSchema.pre("save",async (next)=>{
    if(this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
})

//PASSWORD VERIFY METHOD 

userSchema.methods.comparePassword= async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
    
}

const User= mongoose.model("User", userSchema);
export default User;
