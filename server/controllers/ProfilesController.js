import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import socketService from "../services/SocketService";


export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .put("/positive/:senderEmail", this.editPositive)
      .put("/total", this.editTotal)
      .put("/username", this.editUsername)
      .get("", this.getUserProfile)
      .get('/:id', this.getById)
      .post("", this.create);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async editPositive(req, res, next) {
    try {
      let profile = await profilesService.addPositive(req.params.senderEmail)
      // let data = req.body.positiveRecommend
      // let postive = await profilesService.edit(req.userInfo.email, data)
      // @ts-ignore
      socketService.messageRoom(profile.email, "newPositiveScore", profile.positiveRecommend)
      res.send("success")
    } catch (error) { next(error) }
  }
  async editUsername(req, res, next) {
    try {
      let data = req.body.username
      let username = await profilesService.editUsername(req.userInfo.email, data)
      res.send(username)
    } catch (error) { next(error) }
  }

  async editTotal(req, res, next) {
    try {
      let data = req.body.totalRecommends
      let total = await profilesService.editTotal(req.userInfo.email, data)
      socketService.messageRoom(data.sender, "newTotalScore", data)
      res.send(total)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await profilesService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }
  async getById(req, res, next) {
    try {
      let data = await profilesService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }





}
