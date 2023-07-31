import passport from 'passport'
import { Request, RequestHandler, Response } from 'express'
import User, { IUser } from '../models/UserModel'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

                if (!user) {
                    console.log(profile['_json'])
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(
                            Number(profile['_json'].id)
                        ),
                        username: profile['_json'].first_name,
                        email:
                            profile['_json'].email || profile['_json'].id || '',
                        password: profile['_json'].id,
                        profilePhoto: profile['_json'].picture.data.url,
                        friends: [],
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
