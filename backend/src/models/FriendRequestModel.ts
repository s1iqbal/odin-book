import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './UserModel';

export interface IFriendRequest extends Document {
    from: IUser['_id'];
    to: IUser['_id'];
    status: 'Pending' | 'Accepted' | 'Rejected';
}

const FriendRequestSchema: Schema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model<IFriendRequest>('FriendRequest', FriendRequestSchema);
