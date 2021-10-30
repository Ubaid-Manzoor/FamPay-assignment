const schedule = require("node-schedule");
const dayjs = require("dayjs");
const VideosService = require("../services/Videos");
const YoutubeService = require("../services/Youtube");

schedule.scheduleJob(process.env.FETCH_VIDEO_CRON, async () => {
  try {
    const publishedAfter = dayjs()
      .subtract(process.env.FETCH_TIME_MIN, "minute")
      .toISOString();
    const videos = await YoutubeService.fetchVideos({
      maxResults: process.env.MAX_RESULT_SIZE,
      order: process.env.YOUTUBE_SEARCH_ORDER,
      query: process.env.YOUTUBE_SEARCH_QUERY,
      publishedAfter,
    });

    const response = await VideosService.create(videos);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
