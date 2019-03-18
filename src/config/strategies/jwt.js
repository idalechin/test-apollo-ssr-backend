import {Strategy, ExtractJwt} from 'passport-jwt';
import User from '../../models/user';
import config from '../config';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret
};

const jwt = new Strategy(jwtOptions, async (payload, done) => {

  try{
    const user = await new User({email: payload.sub}).fetch();
    done(null, user);
  } catch (err) {
    done(err, null);
  }


});

export default jwt;