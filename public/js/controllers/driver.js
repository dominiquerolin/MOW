angular.module('Driver', [])

.controller('DriverCtrl', [	
   	'$scope',
	'$http',
	'$routeParams',
	function($scope, $http, $routeParams) {
		console.log("DriverCtrl");

		// Get driver profile
		$http.get('/api/drivers/' + $routeParams.username)
		.success(function(result){
			if(result.status) {
				$scope.data = result.data;
			} else {
				$scope.data = {
					username : $routeParams.username,
				};
			}

		})
		.error(function(result){
			console.log(result);
		});
   	}]);