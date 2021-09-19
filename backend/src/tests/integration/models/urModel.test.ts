require("dotenv").config();
import * as mongoose from "mongoose";
import { urlSchema } from "../../../models/urlModel";

export interface URLDocument extends mongoose.Document {
  longUrl: {
    type: string;
  };
  shortUrl: {
    type: string;
  };
  urlCode: {
    type: String;
  };
  clickCount: {
    type: number;
  };
  address: {
    type: string;
  };
}

const URL = mongoose.model<URLDocument>("URL", urlSchema);

const urlData = {
  longUrl:
    "https://www.bloomberg.com/news/articles/2021-09-17/nigeria-probes-platform-tracking-naira-street-rate-after-crash",
  shortUrl: "http://localhost:3001/OTKijCDlv",
  urlCode: "OTKijCDlv",
  clickCount: 0,
};

describe("URL Model Test", () => {
  // conect to mongodb by using mongoose
  beforeAll(async () => {
    await mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  // shorten URL test suite
  it("shorten & encode URL successfully", async () => {
    const validURL = new URL(urlData);
    const savedURL = await validURL.save();

    expect(savedURL._id).toBeDefined();
    expect(savedURL.longUrl).toBe(urlData.longUrl);
    expect(savedURL.shortUrl).toBe(urlData.shortUrl);
    expect(savedURL.urlCode).toBe(urlData.urlCode);
    expect(savedURL.clickCount).toBe(urlData.clickCount);
  });

  /**
   * Test Schema is working
   * You shouldn't be able to add in any field that isn't defined in the schema
   */
  it("shorten url successfully, but the field not defined in schema should be undefined", async () => {
    const urlWithInvalidField = new URL(urlData);
    const savedURLWithInvalidField = await urlWithInvalidField.save();
    expect(savedURLWithInvalidField._id).toBeDefined();
    expect(savedURLWithInvalidField.address).toBeUndefined();
  });

  // Remove and close the db and server.
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
