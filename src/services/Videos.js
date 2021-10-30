const VideosModel = require("../models/Videos");

class Videos {
  static async create(data) {
    try {
      return await VideosModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async documentCount({ query } = {}) {
    try {
      console.log(query);
      return await VideosModel.countDocuments(query).exec();
    } catch (error) {
      throw error;
    }
  }

  static async findPaginated({ page, pageSize, query, sortBy }) {
    try {
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
      console.log(error);
      throw error;
    }
  }
}

module.exports = Videos;
