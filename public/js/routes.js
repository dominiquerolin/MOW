angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	    $routeProvider
	
	        .when('/', {
	            templateUrl: 'views/home.html'
	        })
	
	        .when('/volunteers/:username', {
	            templateUrl: 'views/volunteer/edit.html',
	            controller: 'VolunteerProfileCtrl'
	        })
	
	        .when('/volunteers', {
	            templateUrl: 'views/volunteer/list.html',
	            controller: 'VolunteerListCtrl'
	        })
		    .when('/register', {
		        templateUrl: 'views/volunteer/add.html',
	            controller: 'VolunteerFormCtrl'
		    });
	
	    $locationProvider.html5Mode(true);
	
	}]);
