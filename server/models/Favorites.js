import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const Favorite = new Schema({
  Song: {
    type: Object,
    required: true
  },
  creatorEmail: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

Favorite.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Favorite;