const btoa = require("btoa");
const atob = require("atob");

export class UtilHelper {
  /**
   * Encode helper.
   *
   * @param id
   * @returns
   */
  public encode(id: Number) {
    const prefix = "http://short.est";

    const encoded = btoa(id);
    return `${prefix}/${encoded}`;
  }

  /**
   * Obtain url path and decode.
   *
   * @param str
   * @returns
   */
  public decode(str: String) {
    const param = str.split("/")[3];
    const converted = atob(param);

    return converted;
  }
}
