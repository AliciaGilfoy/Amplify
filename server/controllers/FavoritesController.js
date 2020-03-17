import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import {
  favoritesService
} from '../services/FavoritesService'





//PUBLIC
export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:title', this.getByTitle)
      .post('', this.create)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      let data = await favoritesService.getAll(req.userInfo.email)
      return res.send(data)
    } catch (err) {
      next(err)
    }
  }

  async getByTitle(req, res, next) {
    try {
      let data = await favoritesService.getByTitle(req.params.title, req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await favoritesService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }



  async delete(req, res, next) {
    try {
      await favoritesService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }
}