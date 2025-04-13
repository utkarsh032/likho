/server
├── /config
│   ├── db.js
│   ├── firebaseAuth.js
│   └── cloudinary.js
├── /controllers
│   ├── blogController.js
│   ├── authController.js
│   ├── commentController.js
│   └── ...
├── /middleware
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── uploadMiddleware.js
├── /models
│   ├── User.js
│   ├── Blog.js
│   ├── Comment.js
│   └── ...
├── /routes
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   ├── commentRoutes.js
│   └── ...
├── /services
│   ├── textToSpeech.js
│   ├── calendarApi.js
│   └── ...
├── /utils
│   ├── calculateReadTime.js
│   ├── generateSlug.js
│   └── ...
├── /uploads              👉 Local image upload (can be skipped if using Cloudinary)
├── server.js
