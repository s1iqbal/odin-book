import passport, { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import bcrypt from 'bcrypt';
import { Profile } from 'passport-facebook';
import User, { IUser } from '../models/UserModel';

const passportConfig = (passport: PassportStatic) => {
    passport.use(new LocalStrategy({
        usernameField: 'email'
      },
      async function(email: string, password: string, done: Function) {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log('Authenticated user:' + user.email)
          if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    ));
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID as string,
        clientSecret: process.env.FACEBOOK_APP_SECRET as string,
        callbackURL: "/auth/facebook/callback"
      },
      async function(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
        const { id, displayName } = profile;
        try {
          let user = await User.findOne({ facebookId: id });
          if (!user) {
            user = await new User({ username: displayName, facebookId: id }).save();
          }
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    ));
    
    passport.serializeUser((user: IUser | any, done: Function) => {
      done(null, user.id);
    });
    
    passport.deserializeUser(async (id: string, done: Function) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch(err) {
          done(err, null);
        }
    });
}



export default passportConfig;