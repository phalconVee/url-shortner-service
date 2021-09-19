const validUrl = require("valid-url");
import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { urlSchema } from "../models/urlModel";
import { generate } from "../utils/hashUtils";

const URL = mongoose.model("URL", urlSchema);

export class URLController {
  /**
   * Encode URL to a shortened URL.
   *
   * @param req
   * @param res
   * @param next
   */
  async shortenURL(req: Request, res: Response, next: NextFunction) {
    /** Validate url */
    const { longUrl } = req.body;
    if (validUrl.isUri(longUrl))
      return res.status(400).json({
        data: ["Invalid URL. Please enter a valid url."],
      });

    /** Check if url exists */
    let urlExists = await URL.findOne({ longUrl: longUrl });
    if (urlExists) {
      return res.status(200).json({
        data: urlExists,
      });
    }

    const urlCode = generate();

    try {
      const baseURL = process.env.BASE_URL;
      const shortUrl = baseURL + "/" + urlCode;

      let newURL = new URL({
        longUrl,
        shortUrl,
        urlCode,
        clickCount: 0,
      });

      newURL = await newURL.save();

      return res.status(200).json({
        data: newURL,
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
    const shortUrlCode = req.params.hash;
    const allowedCicks = process.env.ALLOWED_CLICK;

    try {
      const url = await URL.findOne({ urlCode: shortUrlCode });

      if (url) {
        let clickCount = url.clickCount;
        if (clickCount >= allowedCicks) {
          return res.status(400).json({
            data: [`The click count for ${shortUrlCode} is exceeded`],
          });
        }
        clickCount++;
        await url.update({ clickCount });
        return res.redirect(url.longUrl);
      } else {
        return res.status(400).json({
          data: ["The short url provided doesn't exist"],
        });
      }
    } catch (ex) {
      next(ex);
    }
  }

  /**
   * Returns basic stat of a short URL path.
   *
   * @param req
   * @param res
   * @param next
   */
  async generateBasicStat(req: Request, res: Response, next: NextFunction) {
    const shortUrlCode = req.params.hash;
    try {
      const url = await URL.findOne({ urlCode: shortUrlCode });

      if (url) {
        return res.status(200).json({
          data: url,
        });
      } else {
        return res.status(400).json({
          data: ["The short url provided doesn't exist"],
        });
      }
    } catch (ex) {
      next(ex);
    }
  }
}
