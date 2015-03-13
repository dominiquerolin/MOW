var VolunteerControllers = angular.module('VolunteerControllers', ['FormControllers']);

VolunteerControllers.controller('VolunteerListCtrl', [ 
	'$scope', 
	'$http',
	'$window', 
	function($scope, $http, $window) {

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
						$window.location.href = '/volunteers/'+ obj.username;
					})
				.error(function(msg) {
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

		// Display a single volunteer data
		$http.get('/api/volunteers/' + $routeParams.username)
		.success(
			function(data) {
				console.log(data);
				$scope.v = data;
				if(!$scope.v.phone || !$scope.v.phone.length) $scope.v.phone = [null];

				$scope.tab=3;
				$scope.email_changed=false;
				
				var today = new Date();
				$http.get('/api/calendar/2015/'+(today.getMonth()+1)+'-'+(today.getMonth()+5))
				.success(function(res) { 
					if(!res.error)
						$scope.calendars = res.data;
				})
				.error(function(data){
					console.log('Error: ' + data);
				})
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});

		$scope.addPhone = function( valid ) {
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
				// cleanup phone
				$scope.v.phone.splice(-1,1);
				$http.put('/api/volunteers/' + $scope.v._id, $scope.v)
				.success(
					function(obj) {
						console.log('Success:', obj);
						$scope.alert = {
							error : false,
							message : 'Update successul!'
						};
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
		// Days off handler
		$scope.exception = function(m, d) {
			this.date = m.substr(0,8)+ ('00'+d).slice(-2);
			var s = $scope.v.availability.exceptions;
			this.toggle = function() {
				if(this.hasException()) {
					s.splice(s.indexOf(this.date) ,1);
				} else {
					s.push(this.date);
					s.sort();
				}
			};
			this.hasException = function(){
				return (s.indexOf(this.date)!=-1);
			};
			return this;
		};
		// Frequency table handler
		$scope.frequency = function( d ){
			this.d = d;
			var f = $scope.v.availability.frequency;
			this.toggle = function (w) {
				f[w][this.d] = !f[w][this.d];
			},
			this.isActive = function (w) {
				return f[w][this.d];
			},
			this.toggleAll = function(){
				var current = this.isActiveAll();
				for(w in f) {
					f[w][this.d] = !current;
				}
			};
			this.isActiveAll = function() {
				for(w in f) {
					if(!f[w][d]) return false;
				}
				return true;
			};
			return this;
		};
	} ]);
