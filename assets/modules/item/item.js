var unfolio = angular.module('item', ['item.core', 'item.project', ]);



unfolio.run(function($http, $rootScope){

	$http.get('/User/currentUser/').then(function(response){
		$rootScope.currentUser = response.data;
		
	});

});

unfolio.factory('Items', function($http, $rootScope){
	var domain = '';
	return {
		'getOne': function(item){
			return $http.get('/item/show/'+item).then(function(response){
		    	return response.data;
		    });
		},
		'getAll': function(item){
			return $http.get('/item/', {
				params: {
					user_id: $rootScope.currentUser.id
				}
			}).then(function(response){
		    	return response.data;
		    });
		},
		'relate': function(item1, item2){
			return $http.get('/item/relationship/'+item1+'/'+item2).then(function(response){
				return response.data;
			});
		},
		'disown': function(item1, item2){
			return $http.get('/item/disown/'+item1+'/'+item2).then(function(response){
				return response.data;
			});
		},
	}
});

function ItemCtrl($scope, $http, Items, $stateParams){
	
	Items.getAll($stateParams.item).then(function(res){
		$scope.items = res;
	})
	
};

function ItemSingleCtrl($scope, $http, Items, $stateParams){
	
	//GET ONE
	Items.getOne($stateParams.item).then(function(res){
		$scope.item = res;
	});
	
	//RELATE
	$scope.relate = function(item1){
		Items.relate(item1, $('select#add-relation').val()).then(function(res){
			console.log(res);
			Items.getOne($('select#add-relation').val()).then(function(res){
				$scope.item.related.push(res);
			});
		});
	};
	
	//DISOWN
	$scope.disown = function(item1, item2, index){
		Items.disown(item1, item2).then(function(res){
			console.log(res);
			$scope.item.related.splice(index,1);
		});
	};
	
	//GET ALL AND FIND DIFF OF RELATED
	Items.getAll($stateParams.item).then(function(res){
		$scope.allItems = res;
		
		Items.getOne($stateParams.item).then(function(res){
			$scope.item = res;
			
			$scope.filtered = _.rest($scope.allItems, function(itemb){
				return _.find($scope.item.related, {id: itemb.id});
			});
		});
	})
	
}