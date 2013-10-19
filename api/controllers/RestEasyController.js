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

var gitKeys = {
	login: '490074a2ebeecd8ff906',
	pass: '2f7ad427fc8ae6362b400609008549feeeb9be3f'
};

var linkKeys = {
	login: 'hm19mmytz1y3',
	pass: 'VkPwjdK4ew0HxruC'
};

var tokens = {};

var linkedinTokens = {};

var callbackUrl = {
	github: 'http://localhost:1337/RestEasy/githubCallback',
	linkedin: 'http://localhost:1337/RestEasy/linkedinCallback', 
}

var github = resteasy('resteasy/lib/providers/github', gitKeys, callbackUrl.github);

var linkedin = resteasy('resteasy/lib/providers/linkedin', linkKeys, callbackUrl.linkedin);

module.exports = {

	github : github.connect,
	
	githubCallback: function(req, res){
		github.callback(req, function(error, oauth_token, oauth_token_secret, additionalParameters){
		  tokens.oauth_token = oauth_token;
		  tokens.oauth_token_secret = oauth_token_secret;
		  res.send('succcess! or some shit');
		});
	},
	githubQuery : function(req, res){
		console.log(req.user);
		github.read(tokens, 'repos', {},  function(error, repos){
			if(error){
				res.send('ERROR! '+error.data);
			} else {
				res.send(repos);
			}
		});
		
		
	},
	
	linkedin: linkedin.connect,
	
	linkedinCallback: function(req, res){
		linkedin.callback(req, function(error, oauth_token, oauth_token_secret, additionalParameters){
			linkedinTokens.oauth_token = oauth_token;
			linkedinTokens.oauth_token_secret = oauth_token_secret;
			res.send('success');
		});
	
	},
	
	linkedinQuery: function(req, res){
		linkedin.read(linkedinTokens, 'people', { url: 'http://www.linkedin.com/in/royboy789' }, function(error, repos){
			if(error){
				res.send('ERROR! '+error.data);
			} else {
				res.send(repos)
			}
		});
	}
	

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RestEasyController)
   */
  //_config: {}

  
};
