import passport from 'passport'
import User, { IUser } from '../models/UserModel'

const facebookStrategy = require('passport-facebook').Strategy
export const facebook = () => {
    passport.use(
        new facebookStrategy(
            {
                clientID: process.env.facebook_clientID,
                clientSecret: process.env.facebook_clientSecret,
                callbackURL: process.env.facebook_callbackURL,
                profileFields: ['id', 'email', 'name', 'picture'],
            },
            async function (
                accessToken: any,
                refreshToken: any,
                profile: any,
                cb: any
            ) {
                let user = await User.findOne({ facebookId: profile.id })
                console.log(user)
                console.log(profile)
                if (!user) {
                    const newUser = new User({
                        username: profile['_json'].id,
                        email:
                            profile['_json'].email || profile['_json'].id || '',
                        password: profile['_json'].id,
                        profilePhoto: profile['_json'].picture.data.url,
                        friends: [],
                        friendRequests: [],
                        facebookId: profile.id,
                    })
                    await newUser.save()
                    return cb(null, newUser)
                }
                return cb(null, user)
            }
        )
    )
}
