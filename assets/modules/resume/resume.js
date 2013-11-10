angular.module('user', ['ui.router'])

unfolio.run(function($http, $rootScope){

	$http.get('/User/currentUser/').then(function(response){
		$rootScope.currentUser = response.data;
		
	});

});

unfolio.factory('Resume', function($http, $resource, $rootScope){
	return $resource('/item/', {'user_id': $rootScope.currentUser}, {
		update: {method: 'PUT'}
	});
});