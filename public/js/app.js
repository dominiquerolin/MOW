var MOW = angular.module('MOW', ['ngRoute', 'appRoutes',
                'Navigation',
                'Forms',
                'User',
                'Volunteer']);
                

MOW.controller('ApplicationController', ['$scope','$http', 'Session', function($scope, $http, Session){
	// get session info
	$http.get('/api/me').then(function(session){
		$scope.currentUser = Session.create(session.data)['User'];
		console.log(Session.User);
	});
}]);

MOW.directive("alert", function() {

	return {
		restrict : 'E',
		templateUrl : 'views/modal/alert.html',
	};
});
MOW.directive("loginForm", ['AUTH_EVENTS', function(AUTH_EVENTS) {

	return {
		restrict : 'E',
		templateUrl : 'views/user/login.html',
		link : function (scope) {
		      var showDialog = function () {
		          scope.visible = true;
		        };
		    
		        scope.visible = false;
		        scope.$on(AUTH_EVENTS.loginRequired, showDialog);
		      }

	};
}]);
// adds an optional argument to $location.path() to prevent reloading on url change
MOW.run([
	'$route',
	'$rootScope',
	'$location',
	function($route, $rootScope, $location) {
		var original = $location.path;
		$location.path = function(path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on(
						'$locationChangeSuccess',
						function() {
							$route.current = lastRoute;
							un();
						});
			}
			return original.apply($location, [ path ]);
		};
	} ]);

