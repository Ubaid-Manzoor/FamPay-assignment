const { google } = require("googleapis");
const logger = require("../logger");
const CONSTANTS = require("../config/constants");

class Youtube {
  constructor() {
    this.keyList = CONSTANTS.YOUTUBE_API_KEYS.split(",").map((key) =>
      key.trim()
    );
    this.currentKeyIndex = 0;

    this.googleService = google.youtube({
      version: "v3",
      auth: this.keyList[this.currentKeyIndex],
    });
  }

  setNewKey() {
    if (this.currentKeyIndex < this.keyList.length - 1) {
      this.googleService = google.youtube({
        version: "v3",
        auth: this.keyList[++this.currentKeyIndex],
      });
    } else {
      throw new Error("All keys quota Exceeded");
    }
  }

  async fetchVideos({ maxResults, order, query, publishedAfter }) {
    try {
      if (this.currentKey >= this.keyList.length)
        throw new Error("All keys quota Exceeded");
      if (!maxResults) throw new Error("maxResult is required");
      if (!order) throw new Error("order is required");
      if (!query) throw new Error("query is required");
      if (!query) throw new Error("publishedAfter is required");

      logger.info("@Service Youtube - fetchVideos");
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
      if (error?.errors[0]?.reason === "quotaExceeded") {
        this.setNewKey();
      } else {
        logger.error(`@Service Youtube - fetchVideos ${error}`);
        throw error;
      }
    }
  }
}

module.exports = new Youtube();
