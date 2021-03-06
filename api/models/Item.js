/**
 * Item
 *
 * @module      :: Model
 * @description :: The core collection of objects in unfol.io
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	user_id: { 
  		type: 'string',
  		required: true
	},
  	name: {
  		type: 'string',
  		required: true
  	},
    description: 'string',
  	type: {
  		type: 'string', //PROJECT, SCHOOL, POSITION
  		required: true
  	},
  	network: 'string',
  	category_id: 'string',
  	related: {
  		defaultsTo: [],
  		type: 'array',
  	},
  	published: 'boolean',
    raw: 'json'
  },
  
  beforeCreate: function(values, next){
	  Item.find({
		  user_id: values.user_id,
		  name: values.name,
	  }).done(function(err, user){
		  if(user.length <= 0){
			  next();
		  } else {
			  return err;
		  }
	  });
  }
};
