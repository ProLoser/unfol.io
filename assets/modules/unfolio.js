angular.module('unfolio', ['user', 'item', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'modules/home.html',
    }).state('user', {
    	url: '/user',
    	templateUrl: 'modules/user/default.html'
    }).state('item', {
    	url: '/item',
    	templateUrl: 'modules/item/default.html'
    }).state('category', {
    	url: '/category',
    	templateUrl: 'modules/category/default.html'
    });
    $urlRouterProvider.otherwise('/');
})