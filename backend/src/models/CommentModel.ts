import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './UserModel';

export interface IComment extends Document {
    content: string;
    author: IUser['_id'];
}

const CommentSchema: Schema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema);
