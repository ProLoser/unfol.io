/**
 * Category
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	name: { 
  		type: 'string',
  		required: true
	},
  	type: { 
  		type: 'string',
  		required: true
	},
  	user_id:  { 
  		type: 'string',
  		required: true
	}
    
  }

};
