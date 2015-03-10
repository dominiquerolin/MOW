angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	    $routeProvider
	
	        .when('/', {
	            templateUrl: 'views/home.html'
	        })
	
	        .when('/volunteers/:username', {
	            templateUrl: 'views/volunteer/details.html',
	            controller: 'VolunteerDetailsCtrl'
	        })
	
	        .when('/volunteers', {
	            templateUrl: 'views/volunteer/list.html',
	            controller: 'VolunteerListCtrl'
	        })
		    .when('/register', {
		        templateUrl: 'views/volunteer/register.html',
	            controller: 'VolunteerRegisterFormCtrl'
		    });
	
	    $locationProvider.html5Mode(true);
	
	}]);
