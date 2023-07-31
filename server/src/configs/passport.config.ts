import { PassportStatic } from 'passport'

import { Strategy as LocalStrategy } from 'passport-local'
import { facebook } from './facebook'
import bcrypt from 'bcrypt'
import User, { IUser } from '../models/UserModel'

const passportConfig = (passport: PassportStatic) => {
    //local strategy
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            async function (email: string, password: string, done: Function) {
                try {
                    const user = await User.findOne({ email })
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect email.',
                        })
                    }
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    )
                    console.log('Authenticated user with email: ' + user.email)
                    if (!passwordMatch) {
                        return done(null, false, {
                            message: 'Incorrect password.',
                        })
                    }
                    return done(null, user)
                } catch (err) {
                    return done(err)
                }
            }
        )
    )

    //facebook
    facebook()

    passport.serializeUser((user: IUser | any, done: Function) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id: string, done: Function) => {
        try {
            const user = await User.findById(id).select('username email')
            done(null, user)
        } catch (err) {
            done(err, null)
        }
    })
}

export default passportConfig
