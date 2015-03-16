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
		.success(function(result) {
			$scope.user = result.data;
			$scope.roles = ['User','Admin','SuperAdmin'];
		})
		.error(function(result){
			console.log('Error: ' + result.message);
		});
		
		$scope.update = function(frm){
			if(!frm.$valid) {
				$scope.alert = {
					status : false,
					message : 'Please fix the validation errors below.'
				};				
			}
			else {
				$http.put('/api/users', $scope.user)
				.success(function(result) {
					console.log(result);
					if(result.status)
						$scope.alert = { status : true, message : 'Successfully updated'};
					else
						$scope.alert = { status : false, message :result.message };
				})
				.error(function(msg) {
					$scope.alert = { status : false, message : msg };
				});
			}
		};
	}
])
.controller('UserListCtrl', [ 
	'$scope', 
	'$http',
	'$window', 
	function($scope, $http, $window) {
		console.log("UserListCtrl");

		$http.get('/api/users')
		.success(function(result) {
			console.log(result);
			$scope.users = result.data;
			$scope.roles = ['User', 'Admin', 'SuperAdmin'];
		}).error(function(data) {
			console.log('Error: ' + data);
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
			.error(function(result) {
				console.log('Error connecting to API', data);
			});
		};
	}]
)
.controller('UserRegisterFormCtrl', [
	'$scope',
	function($scope) {
		console.log("UserRegisterFormCtrl");
		$scope.alert = {status : true, message : null };
		$scope.data = {};

	}]
);
