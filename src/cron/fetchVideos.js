const schedule = require("node-schedule");
const dayjs = require("dayjs");
const VideosService = require("../services/Videos");
const YoutubeService = require("../services/Youtube");
const CONSTANTS = require("../config/constants");
const logger = require("../logger");

schedule.scheduleJob(CONSTANTS.FETCH_VIDEO_CRON, async () => {
  try {
    logger.info("@Cron Job Called");
    const publishedAfter = dayjs()
      .subtract(CONSTANTS.FETCH_TIME_SEC, "second")
      .toISOString();
    const videos = await YoutubeService.fetchVideos({
      maxResults: CONSTANTS.MAX_RESULT_SIZE,
      order: CONSTANTS.YOUTUBE_SEARCH_ORDER,
      query: CONSTANTS.YOUTUBE_SEARCH_QUERY,
      publishedAfter,
    });

    const response = await VideosService.create(videos);
    logger.info(`${videos?.length ?? 0} video found`);
  } catch (error) {
    logger.error(`@ScheduleJob ${error}`);
  }
});
