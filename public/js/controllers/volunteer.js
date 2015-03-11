var VolunteerControllers = angular.module('VolunteerControllers', ['FormControllers']);

VolunteerControllers.controller('VolunteerListCtrl', [ 
	'$scope', 
	'$http',
	'$window', 
	function($scope, $http, $window) {
		console.log("VolunteerListCtrl");

		// when landing on the page, get all volunteers and show them
		$http.get('/api/volunteers').success(function(data) {
			$scope.volunteers = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
		$scope.askConfirm = function(msg) {
			return $window.confirm(msg);
		};
		$scope.editVolunteer = function(index) {
			$window.location.href = '/volunteers/'+$scope.volunteers[index].username;
		};
		$scope.deleteVolunteer = function(index) {			 
			$http.delete('/api/volunteers/' + $scope.volunteers[index]._id)
				.success(function(data) { 
					$scope.volunteers.splice(index,1);
					console.log('Deleted volunteer:',data); 
			})
			.error(function(data) {
				console.log('Error deleting volunteer:',data);
			});
		};

	} ]);

VolunteerControllers.controller('VolunteerRegisterFormCtrl', [
	'$scope',
	'$http',
	'$window',
	function($scope, $http, $window) {
		console.log("VolunteerRegisterFormCtrl");

		$scope.alert = {
			error : false,
			message : null
		};

		$scope.v = {
			username : null,
			email : null,
			email_confirm : null,
			active : true
		};

		$scope.register = function(valid) {
			if(!valid) {
				$scope.alert = {
					error : true,
					message : 'Please fix the validation errors below.'
				};				
			}
			else {
				$http.post('/api/volunteers', $scope.v)
				.success(
						function(obj) {
						console.log('Success:', obj);
						$window.location.href = '/volunteers/'+ obj.username;
					})
				.error(function(msg) {
					console.log(msg);
					$scope.alert = {
						error : true,
						message : msg
					};
				});
			}
		};
}]);

VolunteerControllers.controller('VolunteerDetailsCtrl', [
	'$scope',
	'$http',
	'$routeParams',
	function($scope, $http, $routeParams) {
		console.log("VolunteerDetailsCtrl");

		$scope.alert = {
			error : false,
			message : null
		};
		$scope.init = function() {
			$scope.email_changed=false;
		};

		// Display a single volunteer data
		$http.get('/api/volunteers/' + $routeParams.username)
		.success(
			function(data) {
				console.log(data);
				$scope.v = data;
				if(!$scope.v.phone || !$scope.v.phone.length) $scope.v.phone = [null];
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});

		$scope.addPhone = function( valid ) {
			console.log('entry is ', (valid?'valid - add phone':'invalid - do not add phone'));
			valid && $scope.v.phone.push(null);
		};
		$scope.removePhone = function($index) {
			$scope.v.phone.splice($index,1);
		};
		// save to DB
		$scope.updateInfo = function( valid ) {
			// if phone field was edited but not added, push to array
			$scope.v.phone[$scope.v.phone.length-1] && $scope.addPhone(true);
			
			if(!valid) {
				$scope.alert = {
					error : true,
					message : 'Please fix the validation errors below.'
				};
			} else {
				console.log("Form OK: update info");
				var payload = $scope.v;
				payload.phone.splice(-1,1);
				$http.put('/api/volunteers/' + payload._id, payload)
				.success(
					function(obj) {
						console.log('Success:', obj);
						$scope.alert = {
							error : false,
							message : 'Update successul!'
						};
						$scope.init();
						$scope.contactForm.$setPristine();
						$scope.carForm.$setPristine();
						$scope.availabilityForm.$setPristine();
				})
				.error(function(msg) {
					console.log(msg);
					$scope.alert = {
						error : true,
						message : msg
					};
				});
			}
		};

	} ]);
