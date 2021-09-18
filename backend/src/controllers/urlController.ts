const Joi = require("joi");
const btoa = require("btoa");
const atob = require("atob");
import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { urlSchema } from "../models/urlModel";
import { UtilHelper } from "../helpers/utilHelper";

/** Schema validation */
const urlRule = Joi.object({
  url: Joi.string().required(),
});

const URL = mongoose.model("URL", urlSchema);

export class URLController {
  public utils: UtilHelper = new UtilHelper();

  /**
   * Encode URL to a shortened URL.
   *
   * @param req
   * @param res
   * @param next
   */
  async shortenURL(req: Request, res: Response, next: NextFunction) {
    /** Validate request */
    const { error } = urlRule.validate(req.body);
    if (error)
      return res
        .status(422)
        .json({ status: false, data: [error.details[0].message] });

    /** Check if url exists */
    const urlExists = await URL.findOne({ url: req.body.url });
    if (!urlExists) {
      res.status(200).json({
        status: true,
        data: {
          url: req.body.url,
          hash: this.utils.encode(urlExists._id), // turn binary data to base64-encoded ascii.
          status: 200,
        },
      });
    }

    try {
      let urlData = new URL({
        url: req.body.url,
      });

      urlData = await urlData.save();

      return res.status(200).json({
        status: true,
        data: {
          url: req.body.url,
          hash: this.utils.encode(urlData._id),
        },
      });
    } catch (ex) {
      next(ex);
    }
  }

  /**
   * Decodes a shortened URL to its original URL.
   *
   * @param req
   * @param res
   * @param next
   */
  async decodeURL(req: Request, res: Response, next: NextFunction) {
    /** Validate request */
    const { error } = urlRule.validate(req.body);
    if (error)
      return res
        .status(422)
        .json({ status: false, data: [error.details[0].message] });

    try {
      const shortenedLink = req.params.link;
      var converted = this.utils.decode(shortenedLink);

      const ticket = await URL.findOne({ _id: converted });
      res.redirect(ticket.url);
    } catch (ex) {
      res.redirect("/");
    }
  }

  /**
   * Returns basic stat of a short URL path.
   *
   * @param req
   * @param res
   * @param next
   */
  async generateBasicStat(req: Request, res: Response, next: NextFunction) {}
}
