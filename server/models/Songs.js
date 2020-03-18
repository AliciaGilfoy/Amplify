import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Song = new Schema({
  album: {
    type: String
  },
  albumArt: {
    type: String
  },
  albumArtLarge: {
    type: String
  },
  albumtArtSmall: {
    type: String
  },
  artist: {
    type: String
  },
  trackId: {
    type: String, unique: true
  },
  preview: {
    type: String
  },
  price: {
    type: Number
  },
  title: {
    type: String
  }



  // NOTE If you wish to add additional public properties for profiles do so here
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

export default Song;