/**
 * RestEasyController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */



var network = require('./api/services/network');

module.exports = {
	connect : function(req, res){
		network[req.query.network].connect(req, res);
	},
	callback: function(req, res){
		network[req.query.network].callback(req, function(err, oauth_token, oauth_token_secret, params){
			if (err) return res.send('Failed callback to: '+req.query.network);

			var keys = {};
			keys[req.query.network] = {
				oauth_token: oauth_token,
				oauth_token_secret: oauth_token_secret
			};

			User.update({
				user_id: req.session.passport.user
			}, {
				keys: keys
			}, function(err, doc){
				res.redirect('/parser/'+req.query.network);
			});
		});
	}
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RestEasyController)
   */
  //_config: {}

  
};
