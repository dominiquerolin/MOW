angular.module('Forms', [])
// Login
.controller(
		'LoginController',
		[
		'$scope',
		'$rootScope',
		'AuthService',
		'AUTH_EVENTS',
		'$route', '$location',
		'Session',
		function($scope, $rootScope, AuthService, AUTH_EVENTS, $route, $location, Session) {
			$scope.credentials = {
				username : '',
				password : ''
			};
			$scope.submit = function(credentials) {
				console.log('LoginController.submit');
				if (!$scope.Login.$valid) {
					console.log('Form is invalid.');
					$scope.alert = {
						status : false,
						message : 'Please fix the validation errors below.'
					};
					return;
				}
				AuthService
					.login(credentials)
					.then(
						function(res) {
							var authenticated = $rootScope.authenticated = AuthService.isAuthenticated();
							if(authenticated) {
								if(!$rootScope.redirectTo) $rootScope.redirectTo = '/users/' + Session.User.username;  
								console.log('Redirect after login', $rootScope.redirectTo);
								$location.path($rootScope.redirectTo, false);
								$route.reload();
							} else {
								$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
							}								
						
						});
			}
		} ])
// Generic
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
					status: false,
					message : 'Please fix the validation errors below.'
				};
				return;
			}
				
			// Sanitize data and set post url
			var post_url = '';
			switch (frm.$name) {
				case 'Register':
					post_url = '/api/register';
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
			console.log("Form validation passed: submit form to " + post_url, $scope.data);

			$http
				.post(post_url, $scope.data)
				.success(function(result) {
					console.log('Success:',	result);
					$scope.alert = result;
					if(result.status) {
						// Action after success
						switch(frm.$name) {					
							case 'Register':
								$location.path('/volunteers/'+ result.data.username);
								break;
							default:
								frm.$setPristine();
								break;
						}
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
});