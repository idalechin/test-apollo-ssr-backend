import passport from 'passport';
import jwtStrategy from './strategies/jwt';
import localStrategy from './strategies/local';
import config from './config';

module.exports = function (passport) {
  passport.use(jwtStrategy);
  passport.use(localStrategy);
  passport.serializeUser(function(user, cb) { cb(null, user); });
  passport.deserializeUser(function(user, cb) { cb(null, user); });
} 