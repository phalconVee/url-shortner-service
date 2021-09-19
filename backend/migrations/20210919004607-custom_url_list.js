module.exports = {
  async up(db, client) {
    await db
      .collection("movies")
      .insertMany([
        { url: "https://google.com/" },
        { url: "https://goal.com/" },
        { url: "https://opayweb.com/" },
      ]);
  },

  async down(db, client) {
    await db.collection("movies").deleteMany({
      title: {
        $in: [
          "https://google.com/",
          "https://goal.com/",
          "https://opayweb.com/",
        ],
      },
    });
  },
};
