import {
  dbContext
} from "../db/DbContext"
import {
  BadRequest
} from "../utils/Errors"


class RecommendsService {
  async getByRecevierEmail(userEmail) {

    let recommends = await dbContext.Recommends.find({
      recevier: userEmail
    })
    if (!recommends) {
      throw new BadRequest("Invalid email")
    }
    return recommends
  }
  async getAll(userEmail) {
    return await dbContext.Recommends.find({
      receiver: userEmail
    }).populate("creator", "name picture")
  }

  async getByTitle(title, userEmail) {
    let data = await dbContext.Recommends.find({
      "song.title": title,
      creatorEmail: userEmail
    }).populate("creator", "name picture")
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Recommends.create(rawData)
    return data
  }



  async delete(id, userEmail) {
    let data = await dbContext.Recommends.findOneAndRemove({
      _id: id,
      creatorEmail: userEmail
    });
    if (!data) {

      throw new BadRequest("Invalid ID");
    }
  }
}



export const recommendsService = new RecommendsService()
