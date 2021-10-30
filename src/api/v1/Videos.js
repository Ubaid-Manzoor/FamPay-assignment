const express = require("express");
const VideosService = require("../../services/Videos");
const ApiError = require("../../error/ApiError");

const router = express.Router();

router.get("/search", async (req, res, next) => {
  try {
    let {
      page = 1,
      sortBy = "publishedAt",
      pageSize = 10,
      search = "",
    } = req.query;

    // Preprocess the INPUT
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let query;
    if (search) {
      query = { $text: { $search: search } };
    }

    // Handle Bad Request
    if (page <= 0) {
      next(ApiError.badRequest({ message: "page should be greater then 0" }));
    }

    if (pageSize <= 0) {
      next(
        ApiError.badRequest({ message: "pageSize should be greater then 0" })
      );
    }

    let videoCount;
    let videos;

    videoCount = await VideosService.documentCount({ query });
    videos = await VideosService.findPaginated({
      query,
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
    next({}); // will go error handler and default error response will be send
  }
});

module.exports = router;
