var unfolio = angular.module('unfolio', ['user', 'item', 'ui.router']);

unfolio.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'modules/home.html',
    }).state('user', {
    	url: '/user',
    	templateUrl: 'modules/user/default.html'
    }).state('item', {
    	url: '/item',
    	templateUrl: 'modules/item/default.html',
    	controller: 'ItemCtrl'
    }).state('item.item', {
    	url: '/:item',
    	templateUrl: 'modules/item/single.html',
    	controller: 'ItemSingleCtrl'
    }).state('category', {
    	url: '/category',
    	templateUrl: 'modules/category/default.html'
    }).state('resume', {
    	url: '/resume',
    	templateUrl: 'modules/resume/default.html',
    	controller: 'ResumeCtrl'
    });
    $urlRouterProvider.otherwise('/');
    
});

function LoginCtrl($scope, $http){
	$scope.creds = {};

	$scope.login = function(){
		$('#loginForm').hide();
		$('.ajaxLoader').show();
		$http.post('/login', { 	
			'username' : $scope.creds.username,
			'password' : $scope.creds.pass
		}).then(function(res){
			$scope.creds = {};
			$('.ajaxLoader').hide();
			if(res.data.login){
				$('p.loginSuccess').show();
			} else {
				$('p.loginError').show();
				$('#loginForm').show();
			}
		});
	}
	
}