import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema= new mongoose.Schema(
    {
    name:{
        type: String,
        required: true,
        trim: true 
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password:{
        type: String,
        required: true,

    },

    role:{
        type: String,
        enum: ["admin", "HR", "manager", "employee"],
      default: "EMPLOYEE"
    },
    refreshToken:{
         type: String
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, { timestamps: true }
)

// PASSWORD HASHING
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
})

//PASSWORD VERIFY METHOD 

userSchema.methods.comparePassword= async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
    
}

const User= mongoose.model("User", userSchema);
export default User;
