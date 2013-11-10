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