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
		    .when('/logout', {
		        redirectTo: '/',
		        resolve: {
		        	auth: function(AuthService){
		        		AuthService.logout();
		        	}
		        }
		        
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
	            auth: {
	            	roles: [1,2] //@TODO: only use the lowest authorized role
	            }
	        })
	        .when('/users/:username', {
	            templateUrl: 'views/user/profile.html',
	            controller: 'UserCtrl',
	            auth: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers', {
	            templateUrl: 'views/volunteer/list.html',
	            controller: 'VolunteerListCtrl',
	            auth: {	            	
	            	authorizedRoles: [1,2]
	            }
	        })
	        .when('/volunteers/:username', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action:'contact',
	            auth: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers/:username/contact', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action:'contact',
	            auth: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers/:username/availability', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action: 'availability',
	            auth: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/volunteers/:username/driver', {
	            templateUrl: 'views/volunteer/profile.html',
	            controller: 'VolunteerCtrl',
	            action: 'driver',
	            auth: {	            	
	            	authorizedRoles: [0,1,2]
	            }
	        })
	        .when('/roster', {
	        	templateUrl: 'views/roster/index.html',
	        	controller: 'RosterController',
	        	auth: {	            	
	            	authorizedRoles: [1,2]
	            }
	        });
	
	    $locationProvider.html5Mode(true);
	
	}]);
