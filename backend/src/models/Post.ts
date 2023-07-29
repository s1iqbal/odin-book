import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';
import { IComment } from './Comment';

export interface IPost extends Document {
    content: string;
    author: IUser['_id'];
    comments: IComment['_id'][];
    likes: IUser['_id'][];
}

const PostSchema: Schema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);
