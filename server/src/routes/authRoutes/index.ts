import express from 'express'
import { loginUser, logoutUser } from '../../controllers/UserController'
import passport from 'passport'

const router = express.Router()

//auth -> move to routes/authRoutes
router.post('/login', loginUser)

router.post('/logout', logoutUser)

/* Login using facebook */
router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', function (request, response, next) {
    passport.authenticate(
        'facebook',
        function (err: any, user: Express.User, info: { message: any }) {
            if (err) {
                return next(err)
            }
            // Successful authentication, redirect home.
            if (!user) {
                var message = 'Invalid credentials'
                // response.redirect('/login');
                return response.render('login', {
                    message: info.message,
                    userLoggedIn: null,
                })
            }
            request.logIn(user, function (err) {
                if (err) {
                    return next(err)
                }
                response.redirect(`${process.env.FRONTEND_URL}`)
            })
        }
    )(request, response, next)
})

export default router
