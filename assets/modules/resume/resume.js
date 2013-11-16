var unfolio = angular.module('resume', ['ngResource', 'ui.router'])

unfolio.run(function($http, $rootScope){

	$http.get('/User/currentUser/').then(function(response){
		$rootScope.currentUser = response.data;
		
	});

});

unfolio.factory('Resume', function($http, $resource, $rootScope){
	return $resource('/item/type/:type', {'user_id': $rootScope.currentUser, type: '@type'}, {
		update: {method: 'PUT'}
	});
});

function ResumeCtrl($scope, $http, Resume){
	$scope.education = Resume.query({type: 'education'});
	$scope.positions = Resume.query({type: 'position'});
}
