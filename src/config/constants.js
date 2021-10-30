const CONSTANTS = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  FETCH_VIDEO_CRON: process.env.FETCH_VIDEO_CRON,
  MAX_RESULT_SIZE: process.env.MAX_RESULT_SIZE,
  FETCH_TIME_MIN: process.env.FETCH_TIME_MIN,
  YOUTUBE_SEARCH_QUERY: process.env.YOUTUBE_SEARCH_QUERY,
  YOUTUBE_SEARCH_ORDER: process.env.YOUTUBE_SEARCH_ORDER,
};

module.exports = CONSTANTS;
