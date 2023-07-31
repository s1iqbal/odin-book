import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    username: string
    email: string
    password: string
    profilePhoto: string
    friends: IUser['_id'][]
    facebookId: { type: String; default: '' }
    googleId: { type: String; default: '' }
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, required: false },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    facebookId: { type: String, required: false, unique: true },
    googleId: { type: String, required: false, unique: false },
})

UserSchema.pre<IUser>('save', async function (next) {
    const user = this
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export default mongoose.model<IUser>('User', UserSchema)
