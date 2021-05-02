const users = require('../../dummy/users.js');
// class UserControllerTest {
module.exports = {
    // Get all users
    getAllUsers: function(req, res) {
          return res.status(200).json({
                users,
                message: "All the users",
          });
    },
    // Get a single user
    getSingleUser: function(req, res) {
           const findUser = users.find(user => user._id === parseInt(req.params.id, 10));
           if (findUser) {
               return res.status(200).json({
                     user: findUser,
                     message: "A single user record",
               });
           }
           return res.status(404).json({
                 message: "User record not found",
           });
    }
}
// }

// export default UserControllerTest;

