const blogRouter = require('express').Router();

blogRouter.use('/add-blog', require('./add-blog'));
blogRouter.use('/fetch-blogs', require('./fetch-blogs'));

blogRouter.use('/delete-blog', require('./delete-blog'));

module.exports = blogRouter;
