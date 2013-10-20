/**
 * Network
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	user_id: 'string',
  	name: 'string',
  	type: 'string',
  	oauth: {
  		oauth_token: 'string',
  		oauth_token_secret: 'string'
  	}
  	
  }

};
