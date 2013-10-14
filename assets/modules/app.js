angular.module('unfolio', ['user', 'item', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        //templateUrl: 'modules/home.html',
        template:'<h1>TESTING</h1>'
    });
})