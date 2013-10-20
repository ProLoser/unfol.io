/**
 * isSubdomain
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
 
/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, next) {
	var host = req.rawHost.split('.');
	if (host.length > 1) {
		User.findOne({ subdomain: host[0] }).done(function(err, user){
			if (err) return res.send('Subdomain not found');
			delete user.keys;
			req.session.owner = user;
			next()
		})
	} else {
		next()
	}
};
