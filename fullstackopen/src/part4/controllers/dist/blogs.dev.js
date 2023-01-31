"use strict";

var jwt = require('jsonwebtoken');

var blogsRouter = require('express').Router();

var Blog = require('../models/blogs');

var User = require('../models/user'); ////No longer need this function because we can use the middleware tokenExtractor instead


var getTokenFrom = function getTokenFrom(request) {
  var authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

blogsRouter.get('/', function _callee(request, response) {
  var blogs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Blog.find({}).populate('user', {
            username: 1,
            name: 1
          }));

        case 2:
          blogs = _context.sent;
          response.json(blogs);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

blogsRouter.get('/:id', function _callee2(request, response) {
  var blog;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Blog.findById(request.params.id));

        case 2:
          blog = _context2.sent;

          if (blog) {
            response.json(blog);
          } else {
            response.status(404).end();
          } // Blog.findById(request.params.id)
          //   .then(blog => {
          //     if (blog) {
          //       response.json(blog)
          //     } else {
          //       response.status(404).end()
          //     }
          //   })
          //   .catch(error => next(error))


        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
blogsRouter.post('/', function _callee3(request, response) {
  var body, token, decodedToken, user, blog, savedBlog;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          body = request.body;
          token = getTokenFrom(request);
          decodedToken = jwt.verify(token, process.env.SECRET); // const decodedToken = jwt.verify(request.token, process.env.SECRET)

          if (decodedToken.id) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", response.status(401).json({
            error: 'token missing or invalid'
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findById(decodedToken.id));

        case 7:
          user = _context3.sent;
          blog = new Blog({
            url: body.url,
            title: body.title,
            author: body.author,
            user: user._id,
            likes: body.likes
          });

          if (!blog.title || !blog.url) {
            response.status(400).end();
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(blog.save());

        case 12:
          savedBlog = _context3.sent;
          user.blogs = user.blogs.concat(savedBlog._id); //this line enables created blogs to show up in /api/users when a user is logged in

          _context3.next = 16;
          return regeneratorRuntime.awrap(user.save());

        case 16:
          response.json(savedBlog);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
});
blogsRouter["delete"]('/:id', function _callee4(request, response) {
  var id, token, decodedToken, user, blog;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Blog.findById(request.params.id));

        case 2:
          id = _context4.sent;
          // const { id } = request.params
          token = getTokenFrom(request);
          decodedToken = jwt.verify(token, process.env.SECRET); // const decodedToken = jwt.verify(request.token, process.env.SECRET)

          if (!(!request.token || !decodedToken.id)) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", response.status(401).json({
            error: 'token missing or invalid'
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(User.findById(decodedToken.id));

        case 9:
          user = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(Blog.findById(id).populate('user', {
            id: 1
          }));

        case 12:
          blog = _context4.sent;

          if (!user) {
            response.status(400).json({
              error: 'Unauthorized user'
            });
          }

          if (!(user._id.toString() !== blog.user.id.toString())) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("return", response.status(401).json({
            error: 'Unauthorized user',
            user: user._id,
            blogUser: blog.user.id
          }));

        case 16:
          _context4.next = 18;
          return regeneratorRuntime.awrap(Blog.findByIdAndRemove(id));

        case 18:
          response.status(204).end();

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  });
});
blogsRouter.put('/:id', function _callee5(request, response) {
  var body, blog;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          body = request.body;
          blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(Blog.findByIdAndUpdate(request.params.id, blog, {
            "new": true
          }));

        case 4:
          response.status(204).end();

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = blogsRouter; // blogsRouter.post('/', async (request, response) => {
//   const body = request.body
//   const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const user = await User.findById(decodedToken.id)
//   const blog = new Blog({
//     url: body.url,
//     title: body.title,
//     author: body.author,
//     user: user._id,
//     likes: body.likes,
//   })
//   if (!blog.title || !blog.url) {
//     response.status(400).end()
//   }
//   const savedBlog = await blog.save()
//   user.blogs = user.blogs.concat(savedBlog._id)
//   await user.save()
//   response.status(201).json(savedBlog)
//   // response.json(savedBlog)
//   // blog.save()
//   //   .then(savedBlog => {
//   //     response.json(savedBlog)
//   //   })
//   //   .catch(error => next(error))
// })
// blogsRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.status(204).end()
//   // Blog.findByIdAndRemove(request.params.id)
//   //   .then(() => {
//   //     response.status(204).end()
//   //   })
//   //   .catch(error => next(error))
// })