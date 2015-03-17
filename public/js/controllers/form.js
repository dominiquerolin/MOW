angular.module('Forms', [])
.controller('FormController',[
	'$scope',
	'$http',
	'$location',
	'$window',
	function($scope, $http, $location, $window) {
		$scope.go = function(url) {
			$window.location.href = url;
		};
		$scope.confirm = function(msg) {
			return $window.confirm(msg);
		};
		
		$scope.submitForm = function(frm) {

			if (!frm.$valid) {
				$scope.alert = {
					error : true,
					message : 'Please fix the validation errors below.'
				};
				return;
			}
				
			
			// Sanitize data
			var post_url = '';
			switch (frm.$name) {
				case 'Register':
					post_url = '/api/user/';
					break;
				case 'User':
					post_url = '/api/user/' + $scope.data.username;
					
					break;
				case 'Driver':
				case 'VolunteerAvailability':
					post_url = '/api/volunteer/' + $scope.data.username;
					break;
				case 'VolunteerContact':
					post_url = '/api/volunteer/' + $scope.data.username;
					$scope.data.phone = $scope.data.phone.filter(function(data) { return data != null; });
					break;
				default:
					$scope.alert = {
						status : false,
						message : 'No post url defined for "'+ frm.$name + '".'
					};
					return;
			}
			console.log("Form validation passed: submit form to " + post_url);

			$http
				.post(post_url, $scope.data)
				.success(function(result) {
					console.log('Success:',	result);
					if(result.status) {
						if (frm.$name == 'Register') {
							$scope.alert = {
								status : true,
								message : 'Creation successful!'
							};
							$location.path('/volunteers/'+ $scope.data.username);
						} else {
							$scope.alert = {
								status : true,
								message : 'Update successful!'
							};
							frm.$setPristine();
						}
					} else {
						$scope.alert = result;
					}
						
				})
				.error(function(result) {
					console.log('Error:', result);
					$scope.alert = result;
				});

		};
	}
])
.directive("compareTo", function() {
	return {
		require : "ngModel",
		scope : {
			otherModelValue : "=compareTo"
		},
		link : function(scope, element, attributes, ngModel) {

			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function() {
				ngModel.$validate();
			});
		}
	};
})
.directive("alert", function() {

	return {
		restrict : 'E',
		templateUrl : 'views/_elements/alert.html'
	};
});