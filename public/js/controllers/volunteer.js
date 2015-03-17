/*
 * Volunteer controllers handle the actions related to the volunteers personal infos 
 */
function displayError(err) {
	$scope.alert = {status:false,data:null,message:err};
};

angular.module('Volunteer', [])

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
		.error(displayError);
	
		$scope.deleteVolunteer = function(index) {
			$http.delete('/api/volunteer/' + $scope.volunteers[index].username)
			.success(function(result) {
				if(result.status)
					$scope.volunteers.splice(index,1);
				else
					console.log(result.message);
			})
			.error(displayError);
		};
		
		$scope.humanReadableFrequency = function(freq) {
			var weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
			var list = {};
			for(week in freq) {
				for(day in freq[week]) {
					if(!list[weekdays[day]]) list[weekdays[day]] = 0;
					freq[week][day]==true && list[weekdays[day]]++;
				}
			}
			return list;
		}
}])

.controller('VolunteerCtrl', [
	'$scope',
	'$http',
	'$routeParams',
	function($scope,$http,$routeParams){
		console.log("VolunteerCtrl");		
		
		// get volunteer data
		$http.get('/api/volunteer/' + $routeParams.username)
		.success(function(result) {
			console.log("API result received",result);	
			if(result.status) {
				console.log('edit existing profile');
				initScope(result.data);
			} else {
				// if no profile found, create one
				console.log('create new profile');
				$http.post('/api/volunteer/' + $routeParams.username, {username:$routeParams.username})
				.success(function(result){
					displayError("This user doesn't have a volunteer profile yet. Please add details.");
					initScope(result.data);
				})
				.error(displayError)
			}
		})
		.error(displayError);
		
		// init form data
		function initScope(data) {
			console.log("init scope", data);	
			$scope.data = data;

			// Frequency table handler
			$scope.frequency = function( d, f ){
				var f = $scope.data.availability.frequency;
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

			// Get calendars for next months
			var today = new Date();
			$http.get('/api/calendar/2015/'+(today.getMonth()+1)+'-'+(today.getMonth()+5))
			.success(function(res) {
				if(res.status)
					$scope.calendars = res.data;
			})
			.error(displayError);
			
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
		}

}]);