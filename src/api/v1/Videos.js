const express = require("express");
const VideosService = require("../../services/Videos");
const ApiError = require("../../error/ApiError");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let { page = 1, pageSize = 10, sortBy = "publishedAt" } = req.query;
    if (page <= 0) {
      next(ApiError.badRequest({ message: "page should be greater then 0" }));
    }

    if (pageSize <= 0) {
      next(
        ApiError.badRequest({ message: "pageSize should be greater then 0" })
      );
    }

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const videoCount = await VideosService.documentCount();
    const videos = await VideosService.findPaginated({
      page,
      pageSize,
      sortBy,
    });

    const hasNext = videoCount > page * pageSize;
    const hasPrev = page > 1;

    res.status(200).json({
      hasNext,
      hasPrev,
      data: videos,
    });
  } catch (error) {
    console.log(error);
    next({});
  }
});

router.get("/search", async (req, res, next) => {
  try {
    let { page = 1, sortBy = "publishedAt", pageSize = 10, query } = req.query;
    if (page <= 0) {
      next(ApiError.badRequest({ message: "page should be greater then 0" }));
    }

    if (pageSize <= 0) {
      next(
        ApiError.badRequest({ message: "pageSize should be greater then 0" })
      );
    }

    if (!query)
      next(ApiError.badRequest({ message: "query should be present" }));

    console.log("@GET /api/v1/videos INPUT ", {
      page,
      sortBy,
      pageSize,
      query,
    });

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    let videoCount;
    let videos;

    videoCount = await VideosService.documentCount({
      query: { $text: { $search: query } },
    });

    videos = await VideosService.findPaginated({
      query: { $text: { $search: query } },
      page,
      pageSize,
      sortBy,
    });

    const hasNext = videoCount > page * pageSize;
    const hasPrev = page > 1;

    res.status(200).json({
      hasNext,
      hasPrev,
      data: videos,
    });
  } catch (error) {
    next({}); // will go error handler and default error response will be send
  }
});

module.exports = router;
