import {
  dbContext
} from "../db/DbContext"
import {
  BadRequest
} from "../utils/Errors"


class SongsService {
  async getAll(userEmail) {
    return await dbContext.Songs.find({
      creatorEmail: userEmail
    }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Songs.findOne({
      _id: id,
      creatorEmail: userEmail
    }).populate("creator", "name picture")
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Songs.create(rawData)
    return data
  }



  async delete(id, userEmail) {
    let data = await dbContext.Songs.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail
    });
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
  }

}


export const songsService = new SongsService()