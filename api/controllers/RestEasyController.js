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



var resteasy = require('resteasy');

var keys = {
	login: '490074a2ebeecd8ff906',
	pass: '2f7ad427fc8ae6362b400609008549feeeb9be3f'
}

var callbackUrl = '/RestEasy/githubCallback';

var github = resteasy('resteasy/lib/providers/github', keys);

module.exports = {

	github : function(req, res){
		github.connect(callbackUrl);
	},
	
	githubCallback: function(req, res){
		res.send('callback');
	
	}
	

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RestEasyController)
   */
  //_config: {}

  
};
