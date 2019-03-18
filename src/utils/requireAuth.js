import passport from 'passport';
import TestUser from '../models/testUser'

export const requireAuth = passport.authenticate('jwt', {session: false});
export const checkAuth = async (req, res, next) => {
	passport.authenticate('jwt', async function(err, user, info) {
		if (err) { console.log(err); return next(err); }

		if(!user){
			return next(null, null);
		}

		const testUser = await new TestUser().where({user_id: user.id}).fetch()
		user.set('is_test_user', !!testUser)
		req.logIn(user, function(err) {
			if(err) return next(err);
			next(null, user);
		});


	})(req, res, next);
};
