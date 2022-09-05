const express = require('express')
const { userRegister, userLogin, userLogout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsers, updateUserRole, deleteUser } = require('../controllers/userController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router()

router.route("/register").post(userRegister)

router.route("/login").post(userLogin)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(userLogout)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUsers)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)



module.exports = router
