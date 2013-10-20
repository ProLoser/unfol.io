/**
 * ItemController
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

var _ = require('lodash');

module.exports = {

	relate : function(req, res){
		var item1 = req.params.id1
		var item2 = req.params.id2
		
		Item.findOne(item1).done(function(err,item){
			if(err) return res.send(err);
			if(!~item.related.indexOf(item2)){
				item.related.push(item2);	
				item.save(function(err){
					if(err) return res.send(err);
					Item.findOne(item2).done(function(err,item){
						if(err) return res.send(err);
						if(!~item.related.indexOf(item1)){
							item.related.push(item1);
							item.save(function(err){
								if(err) return res.send(err);
								res.send('done');		
							});
						}
					});	
				});
			} else {
				res.send('already related');
			}
			
		});
	},
	
	disown: function(req, res){
		var item1 = req.params.id1
		var item2 = req.params.id2
		
		Item.findOne(item1).done(function(err,item){
			if(err) return res.send(err);
			if(!!~item.related.indexOf(item2)){
				console.log('here'); 
				item.related = _.without(item.related, item2);
				item.save(function(err){
					if(err) return res.send(err);
					Item.findOne(item2).done(function(err,item){
						if(err) return res.send(err);
						if(!!~item.related.indexOf(item1)){
							item.related = _.without(item.related, item1);
							item.save(function(err){
								if(err) return res.send(err);
								res.send('done');
							});
						}
					});	
				});
			} else {
				res.send('already not related');
			}
			
		});
		
	},

   _config: {}

  
};
