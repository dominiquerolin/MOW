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

		$http.get('/api/users/'+$routeParams.username)
		.success(function(user) {
			$scope.data = user.data;
			$scope.roles = ['User','Admin','SuperAdmin'];
			console.log($scope.data);
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

		$http.get('/api/users')
		.success(function(users) {
			console.log(users);
			$scope.users = users.data;
			$scope.roles = ['User', 'Admin', 'SuperAdmin'];
		})
		.error(function(err){
			$scope.alert = {status : false,	message : err };
		});
		

		$scope.askConfirm = function(msg) {
			return $window.confirm(msg);
		};
		$scope.editUser = function(index) {
			$window.location.href = '/users/'+$scope.users[index].username;
		};
		$scope.viewDetails = function(index) {
			$window.location.href = '/volunteers/'+$scope.users[index].username;
		};
		$scope.deleteUser = function(index) {			 
			$http.delete('/api/users/' + $scope.users[index]._id)
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
