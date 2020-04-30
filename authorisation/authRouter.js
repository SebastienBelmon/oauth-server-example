/**
 *
 * @param {object} router we assign routes and endpoint functions for each route to
 * this object.
 * @param {function} expressApp an instance of the express app. By applying
 * expressApp.oauth.grant() method to an endpoint, the endpoint will return
 * a bearer token to the client if it provides valid credentials.
 * @param {object} authRoutesMethods an object which contains the
 * registration method. It can be populated with other methods such as
 * deleteUser() if you decide to build out of this project's structure.
 * @returns route
 */
const authRouter = (router, expressApp, authRoutesMethods) => {
  //? this is the route client's will call to register new users.
  router.post('./registerUser', authRoutesMethods.registerUser);

  /**
   * This is the route for allowing existing users to login using username
   * and password. If success, return bearer token they will need to access
   * auth protected areas.
   * the .grant() method we pass in as middleware below will handle sending
   * the bearer token back to the client as long as we validate
   * their username and password properly using the mode we'ill implement
   */
  router.post('./login', expressApp.oauth.grant());

  return router;
};

module.exports = authRouter;
