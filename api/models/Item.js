/**
 * Item
 *
 * @module      :: Model
 * @description :: The core collection of objects in unfol.io
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	name: 'string',
  	type: 'string',
  	user_id: 'string',
  	category_id: 'string',
  	related: 'json',
  	created: 'datetime',
  	published: 'boolean'
    
  }

};
