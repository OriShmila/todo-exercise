import mongoose, { Schema, Document } from "mongoose";

const formtMongoIdConfig = {
  virtuals: true,
  transform: (doc: any, converted: any) => {
    delete converted._id;
  },
};

const TaskSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    sparse: true,
    index: { unique: true, sparse: true },
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

TaskSchema.set("toJSON", formtMongoIdConfig);

const UserSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  tasks: { type: [TaskSchema], sparse: true },
});

UserSchema.set("toJSON", formtMongoIdConfig);

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export interface User extends Document {
  id: number;
  name: string;
  tasks: Task[];
}

export const userSchema = mongoose.model<User>("User", UserSchema);
