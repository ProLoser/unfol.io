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

var network = require('./../services/network');

module.exports = {
    
    github : function(req, res){
		User.findOne(req.session.passport.user).done(function(err,user){
			if(err) return res.send('ERROR' + err.data);
			network.github.read(user.keys.github, 'repos', {},  function(error, repos){
				if(error) return res.send('ERROR! '+error.data);
				for(var i=0;i<repos.length;i++){
					(function(repo){
						Item.create({
							name: repo.name,
							user_id: req.session.passport.user,
							github_id: repo.id,
							public_url: repo.html_url,
							description: repo.description,
							language: repo.language,
							raw: repo
						}).done(function(err, item){
							if(err) return console.log(err);
							console.log(repo.name+' Created!');
						});
					})(repos[i]);
					
				} //END FOR LOOP
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
			network.linkedin.read(user.keys.linkedin, 'people', { fields: setFields }, function(error, repos){
				if(error){
					res.send('ERROR! ',error.data);
				} else {
					for(var i=0;i<repos.educations.values.length;i++){
						(function(repo){
							Item.create({
								user_id: req.session.passport.user,
								name: repo.schoolName,
								school_id: repo.id,
								startDate: repo.startDate,
								endDate: repo.endDate
								
							}).done(function(err, item){
								if(err) return console.log(err);
								console.log(repo.schoolName+' Created!');
							});
						})(repos.educations.values[i]);
					} //END FOR LOOP
					
					for(var j=0;j<repos.positions.values.length;j++){
						(function(repo){
							Item.create({
								user_id: req.session.passport.user,
								name: repo.company.name,
								position_id: repo.id,
								startDate: repo.startDate,
								endDate: repo.endDate,
								summary: repo.summary,
								title: repo.title
								
							}).done(function(err, item){
								if(err) return console.log(err);
								console.log(repo.company.name+' Created!');
							});
						})(repos.positions.values[j]);
					} //END FOR LOOP
					res.send('done');
				}
			});
		});
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ParserController)
   */
  _config: {}

  
};
