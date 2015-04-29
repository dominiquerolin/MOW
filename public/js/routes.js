angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider) {
	
	    /**
	     * Public Area
	     */
	    $routeProvider
	        .when('/', {
	            templateUrl: 'views/home.html'
	        })
		    .when('/login', {
		        templateUrl: 'views/user/login.html'
		    })
		    .when('/register', {
		        templateUrl: 'views/user/register.html'
		    })
		    /**
		     * Authenticated Area
		     */
	        .when('/users', {
	            templateUrl: 'views/user/list.html',
	            controller: 'UserListCtrl',
	            data: {	            	
	            	authorizedRoles: [1,2]
	            }
	        })
	        .when('/users/:username', {
	            templateUrl: 'views/user/profile.html',
	            controller: 'UserCtrl',
	            data: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers', {
	            templateUrl: 'views/volunteer/list.html',
	            controller: 'VolunteerListCtrl',
	            data: {	            	
	            	authorizedRoles: [1,2]
	            }
	        })
	        .when('/volunteers/:username', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action:'contact',
	            data: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers/:username/contact', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action:'contact',
	            data: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers/:username/availability', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action: 'availability',
	            data: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers/:username/driver', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action: 'driver',
	            data: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        });
	
	    $locationProvider.html5Mode(true);
	
	}]);
