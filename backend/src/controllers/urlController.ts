const Joi = require("joi");
import { Request, Response, NextFunction } from "express";

export class URLController {
  /**
   * Encode URL to a shortened URL.
   *
   * @param req
   * @param res
   * @param next
   */
  async shortenURL(req: Request, res: Response, next: NextFunction) {}

  /**
   * Decodes a shortened URL to its original URL.
   *
   * @param req
   * @param res
   * @param next
   */
  async decodeURL(req: Request, res: Response, next: NextFunction) {}

  /**
   * Returns basic stat of a short URL path.
   *
   * @param req
   * @param res
   * @param next
   */
  async generateBasicStat(req: Request, res: Response, next: NextFunction) {}
}
