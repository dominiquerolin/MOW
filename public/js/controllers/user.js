/*
 * User controllers handle the actions related to the user rights on the website 
 */
angular.module('User', [])


.controller('UserCtrl', [ 
	'$scope', 
	'$http',
	'$window', 
	'$routeParams',
	function($scope, $http, $window,$routeParams) {
		console.log("UserCtrl");

		$http.get('/api/user/'+$routeParams.username)
		.success(function(user) {
			$scope.data = user.data;
			$scope.roles = ['User','Admin','SuperAdmin'];

		})
		.error(function(err){
			$scope.alert = {status : false,	message : err };
		});
	}
])
.controller('UserListCtrl', [ 
	'$scope', 
	'$http',
	'$window', 
	function($scope, $http, $window) {
		console.log("UserListCtrl");

		$http.get('/api/user')
		.success(function(users) {
			console.log(users);
			$scope.users = users.data;
			$scope.roles = ['User', 'Admin', 'SuperAdmin'];
		})
		.error(function(err){
			$scope.alert = {status : false,	message : err };
		});

		$scope.viewDetails = function(index) {
			$window.location.href = '/volunteers/'+$scope.users[index].username;
		};
		$scope.deleteUser = function(index) {
			$http.delete('/api/user/' + $scope.users[index].username)
			.success(function(result) {
				if(result.status)
					$scope.users.splice(index,1);
				else
					console.log(result.message);
			})
			.error(function(err){
				$scope.alert = {status : false,	message : err };
			});
		};
	}]
);
