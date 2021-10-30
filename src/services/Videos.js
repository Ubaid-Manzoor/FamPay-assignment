const VideosModel = require("../models/Videos");
const logger = require("../logger");

class Videos {
  static async create(data) {
    try {
      logger.info(`@Service Videos - create`);
      return await VideosModel.create(data);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  static async documentCount({ query } = {}) {
    try {
      logger.info("@Service Videos - documentCount");
      return await VideosModel.countDocuments(query).exec();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  static async findPaginated({ page, pageSize, query, sortBy }) {
    try {
      logger.info("@Service Videos - findPaginated");
      return await VideosModel.find(query, {
        title: 1,
        description: 1,
        channelId: 1,
        channelTitle: 1,
        videoId: 1,
        publishedAt: 1,
      })
        .sort({ [sortBy]: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

module.exports = Videos;
