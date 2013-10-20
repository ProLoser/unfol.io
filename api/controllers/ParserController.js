/**
 * ParserController
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

var networks = require('./../services/networks');

module.exports = {
    
    github : function(req, res){
		User.findOne(req.session.passport.user).done(function(err,user){
			if(err) return res.send('ERROR' + err.data);
			networks.github.read(user.keys.github, 'repos', {},  function(error, repos){
				if(error) return res.send('ERROR! '+error.data);
				_.each(repos, function(repo){
					Item.create({
						name: repo.name,
						user_id: req.session.passport.user,
						github_id: repo.id,
						public_url: repo.html_url,
						description: repo.description,
						language: repo.language,
						type: 'project',
						network: 'github',
						raw: repo
					}).done(function(err, item){
						if(err) return console.log(err);
						console.log(repo.name+' Created!');
					});
				});
				res.send('done');	
			});
		})
	},
	
	linkedin: function(req, res){
		User.findOne(req.session.passport.user).done(function(err,user){
			var setFields = {
				'first-name' : true,
				'last-name' : true,
				'positions' : true,
				'educations' : true
			};
			networks.linkedin.read(user.keys.linkedin, 'people', { fields: setFields }, function(error, data){
				if(error) return res.send('ERROR! ',error.data);
				
				_.each(data.educations.values, function(edu){
					Item.create({
						user_id: req.session.passport.user,
						name: edu.schoolName,
						school_id: edu.id,
						startDate: edu.startDate,
						endDate: edu.endDate,
						type: 'education',
						network: 'linkedin'
						
					}).done(function(err, item){
						if(err) return console.log(err);
						console.log(edu.schoolName+' Created!');
					});
				});
				
				_.each(data.positions.values, function(job){
					Item.create({
						user_id: req.session.passport.user,
						name: job.company.name,
						position_id: job.id,
						startDate: job.startDate,
						endDate: job.endDate,
						summary: job.summary,
						title: job.title,
						type: 'position',
						network: 'linkedin'
						
					}).done(function(err, item){
						if(err) return console.log(err);
						console.log(job.company.name+' Created!');
					});
				});
				res.send('done');
			});
		});
	},
	instagram : function(req, res){
		User.findOne(req.session.passport.user).done(function(err,user){
			if(err) return res.send('ERROR' + err.data);
			
			networks.instagram.read(user.keys.instagram, 'media', {},  function(error, media){
				if(error) return res.send(error.data);
				
				_.each(media.data, function(image){
					Item.create({
						user_id: req.session.passport.user,
						name: 'image'+image.id,
						github_id: image.id,
						public_url: image.link,
						image_src: image.images.standard_resolution,
						caption: image.caption.text,
						type: 'image/media',
						network: 'instagram'
					}).done(function(err, item){
						if(err) return console.log(err);
						console.log('Image Created!');
					});
				});
				
				res.send('done');	
			});
		}); // END USER FIND
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ParserController)
   */
  _config: {}

  
};
