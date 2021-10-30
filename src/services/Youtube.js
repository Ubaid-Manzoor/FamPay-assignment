const { google } = require("googleapis");

class Youtube {
  constructor() {
    this.googleService = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  async fetchVideos({ maxResults, order, query, publishedAfter }) {
    try {
      if (!maxResults) throw new Error("maxResult is required");
      if (!order) throw new Error("order is required");
      if (!query) throw new Error("query is required");
      if (!query) throw new Error("publishedAfter is required");

      console.log({ maxResults, order, query, publishedAfter });
      const {
        data: { items },
      } = await this.googleService.search.list({
        part: ["snippet"],
        maxResults,
        order,
        q: query,
        publishedAfter,
      });

      const videos = items.map((item) => {
        const { snippet, id } = item;
        const { videoId } = id;
        const {
          title,
          description,
          channelId,
          channelTitle,
          thumbnails,
          publishedAt,
        } = snippet;

        return {
          title,
          description,
          channelId,
          channelTitle,
          videoId,
          publishedAt,
          thumbnails: {
            default: thumbnails.default,
            medium: thumbnails.medium,
            high: thumbnails.high,
          },
        };
      });

      return videos;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Youtube();
