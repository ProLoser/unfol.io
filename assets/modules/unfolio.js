angular.module('unfolio', ['user', 'item', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'modules/home.html',
    }).state('users', {
    	url: '/users',
    	templateUrl: 'modules/user/default.html'
    });
    $urlRouterProvider.otherwise('/');
})