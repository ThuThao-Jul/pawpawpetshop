


blogController.getBlogs = catchAsync(async (req, res, next) => {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
  
    const totalBlogs = await Blog.countDocuments({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalBlogs / limit);
    const offset = limit * (page - 1);
  
    // console.log({ filter, sortBy });
    const blogs = await Blog.find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author");
  
    return sendResponse(res, 200, true, { blogs, totalPages }, null, "");
  });