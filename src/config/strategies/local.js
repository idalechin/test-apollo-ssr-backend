import LocalStrategy from 'passport-local';
import User from '../../models/user';


const localOptions = { usernameField: 'email' };
export default new LocalStrategy(localOptions, function (email, password, done) {

  User
    .checkPassword(email, password)
    .then(user => {
      if(!user) { return done(null, false); }
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});