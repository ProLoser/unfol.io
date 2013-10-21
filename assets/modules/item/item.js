var unfolio = angular.module('item', ['item.core', 'item.project', ]);

var apiURL = 'http://roy.unfolio:1337';

unfolio.factory('Items', function($http){
	var domain = '';
	return {
		getToken: function(method) {
			return $http.g(MyAjax.resturl+'/get_nonce', method, {
			    params: {
			    	controller: 'posts',
			    	method: method
			    }
		    }).then(function(response){
		    	return response.data.nonce;
		    });	
		},
		'get': function(item){
			return $http.get(apiURL+'/item/show/'+item).then(function(response){
				console.log(response.data);
		    	return response.data;
		    });
		},
	}
});

function ItemCtrl($scope, $http, Items, $stateParams){
	
	//Items.get($scope.item);
	
};

function ItemSingleCtrl($scope, $http, Items, $stateParams){
	$scope.related = {};
	
	Items.get($stateParams.item).then(function(res){
		$scope.item = res;
	});
	
}