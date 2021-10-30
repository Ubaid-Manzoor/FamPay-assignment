const VideosModel = require("../models/Videos");

class Videos {
  static async create(data) {
    try {
      return await VideosModel.create(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Videos;
