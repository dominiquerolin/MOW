angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	    $routeProvider
	
	        .when('/', {
	            templateUrl: 'views/home.html'
	        })
	        // User area handles their permissions on the site
	        .when('/users', {
	            templateUrl: 'views/user/list.html',
	            controller: 'UserListCtrl'
	        })
	        .when('/users/:username', {
	            templateUrl: 'views/user/profile.html',
	            controller: 'UserCtrl'
	        })
		    .when('/login', {
		        templateUrl: 'views/user/login.html'
		    })
		    .when('/register', {
		        templateUrl: 'views/user/register.html'
		    })
		    // Volunteer area handles their volunteer profile/data
	        .when('/volunteers', {
	            templateUrl: 'views/volunteer/list.html',
	            controller: 'VolunteerListCtrl'
	        })
	        .when('/volunteers/:username', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action:'contact'
	        })
	        .when('/volunteers/:username/contact', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action:'contact'
	        })
	        .when('/volunteers/:username/availability', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action: 'availability'
	        })
	        .when('/volunteers/:username/driver', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action: 'driver'
	        });
	
	    $locationProvider.html5Mode(true);
	
	}]);
