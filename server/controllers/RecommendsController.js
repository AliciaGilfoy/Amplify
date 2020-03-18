import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import {
  recommendsService
} from '../services/RecommendsService'
import socketService from "../services/SocketService";






//PUBLIC
export class RecommendsController extends BaseController {
  constructor() {
    super("api/recommends")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get('/sent', this.getAllSent)
      .get('/:title', this.getByTitle)
      //.post('/', this.getByRecevierEmail)
      .post('', this.create)
      .delete('/:id', this.delete)

  }
  async getAll(req, res, next) {
    try {
      let data = await recommendsService.getAll(req.userInfo.email)
      return res.send(data)
    } catch (err) {
      next(err)
    }
  }

  async getByTitle(req, res, next) {
    try {
      let data = await recommendsService.getByTitle(req.params.title, req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getByRecevierEmail(req, res, next) {
    try {
      let data = await recommendsService.getByRecevierEmail(req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await recommendsService.create(req.body);
      socketService.messageRoom(data["receiver"], "newRec", data);
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await recommendsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }
}