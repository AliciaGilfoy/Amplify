import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import {
  songsService
} from '../services/SongsService'





//PUBLIC
export class SongsController extends BaseController {
  constructor() {
    super("api/songs")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      let data = await songsService.getAll(req.userInfo.email)
      return res.send(data)
    } catch (err) {
      next(err)
    }
  }


  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await songsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }



  async delete(req, res, next) {
    try {
      await songsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }
}