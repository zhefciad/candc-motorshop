'use strict';




module.exports = {

  
  /**
   * An sasynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {


    // Set up CORS for the socket.io instance.
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: { // cors setup
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    let user = null

    // Listen for new connections.
    io.on('connection', (socket) => {
      console.log('New client connected');
    
      // Join the user to a specific room named after their user ID.
      socket.on('joinRoom', (userId) => {
        socket.join(userId);
        user = userId
        console.log(`User ${userId} joined room`);
      });
    
      // Send a welcome message to the joined room
      socket.on('joined', (userId) => {
        io.to(userId).emit('welcome', 'Welcome to the room, user ' + userId);
      });
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
        console.log(`User ${user} left the room`);
      });
    });
    strapi.io = io;


  },
};
