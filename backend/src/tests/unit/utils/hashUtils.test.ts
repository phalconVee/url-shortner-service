const shortid = require("shortid");

describe("Hash Utilities Test", () => {
  /**
   * Test helper function is working.
   */
  it("returns short id", async () => {
    const generate = shortid.generate();

    expect(typeof generate).toMatch("string");
  });
});
