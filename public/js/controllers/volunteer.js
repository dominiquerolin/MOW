
var weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

/*
 * Volunteer controllers handle the actions related to the volunteers personal infos 
 */
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
		.error(function (err) { $scope.alert = {status:false, message:err}; });
	
		$scope.deleteVolunteer = function(index) {
			$http.delete('/api/volunteer/' + $scope.volunteers[index].username)
			.success(function(result) {
				if(result.status)
					$scope.volunteers.splice(index,1);
				else
					console.log(result.message);
			})
			.error(function (err) { $scope.alert = {status:false, message:err}; });
		};
		
		$scope.humanReadableFrequency = function(freq) {
			
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
				$scope.data = result.data;
			} else {
				// if no profile found, create one
				console.log('create new profile');
				$http.post('/api/volunteer/' + $routeParams.username, {username:$routeParams.username})
				.success(function(result){
					$scope.alert = {status:false, message:"This user doesn't have a volunteer profile yet. Please add details."};
					$scope.data = result.data;
				})
				.error(function (err) { $scope.alert = {status:false, message:err}; })
			}
		})
		.error(function (err) { $scope.alert = {status:false, message:err}; });

		$scope.weekdays = weekdays;
		// Get calendars for next months
		var today = new Date();
		$http.get('/api/calendar/2015/'+(today.getMonth()+1)+'-'+(today.getMonth()+5))
		.success(function(res) {
			if(res.status)
				$scope.calendars = res.data;
		})
		.error(function (err) { $scope.alert = {status:false, message:err}; });

}]);