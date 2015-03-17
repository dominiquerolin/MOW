/*
 * Volunteer controllers handle the actions related to the volunteers personal infos 
 */
angular.module('Volunteer', [])

.controller('VolunteerCtrl', [
	'$scope',
	'$http',
	'$routeParams',
	function($scope,$http,$routeParams){
		console.log("VolunteerCtrl");
		$http.get('/api/volunteer/' + $routeParams.username)
		.success(function(result) {
			if(result.status) {
				console.log('edit existing', result);
				$scope.data = result.data;
			} else {
				console.log('create new profile');
				$scope.data = {
					username: $routeParams.username
				}
			}
		})
		.error(function(data) {
			console.log( 'Error: ' + data );
		});
}])
.controller('VolunteerListCtrl', [ 
	'$scope', 
	'$http',
	'$window', 
	function($scope, $http, $window) {
		console.log("VolunteerListCtrl");
	
	$http.get('/api/volunteer')
	.success(function(volunteers) {
		console.log(volunteers);
		$scope.volunteers = volunteers.data;
	})
	.error(function(err){
		$scope.alert = {status : false,	message : err };
	});

	$scope.deleteVolunteer = function(index) {
		$http.delete('/api/volunteer/' + $scope.volunteers[index].username)
		.success(function(result) {
			if(result.status)
				$scope.volunteers.splice(index,1);
			else
				console.log(result.message);
		})
		.error(function(err){
			$scope.alert = {status : false,	message : err };
		});
	};
}])
.controller('VolunteerAvailabilityCtrl', [
	'$scope',
	'$http',
	function($scope, $http) {
		console.log("VolunteerAvailabilityCtrl");

		// Get calendars for next months
		var today = new Date();
		$http.get('/api/calendar/2015/'+(today.getMonth()+1)+'-'+(today.getMonth()+5))
		.success(function(res) {
			if(res.status)
				$scope.calendars = res.data;
		})
		.error(function(data){
			console.log ('Error: ' + data);
		})

		// Days off handler
		$scope.exception = function(m, d) {
			this.date = m.substr(0,8)+ ('00'+d).slice(-2);
			var s = $scope.data.availability.exceptions;
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
			var f = $scope.data.availability.frequency; //TODO: ensure $scope.data is loaded before defining this function
			this.d = d;
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
	
	}
]);