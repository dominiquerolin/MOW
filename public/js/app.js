
var MOW = angular.module('MOW', ['ngRoute', 'appRoutes',
                'Navigation',
                'Forms',
                'User',
                'Volunteer']);

MOW.constant('WEEKDAYS', ['Monday','Tuesday','Wednesday','Thursday','Friday']);  
MOW.directive("alert", function() {
	return {
		restrict : 'E',
		templateUrl : 'views/modal/alert.html',
	};
});
MOW.directive("debug", function() {
	return {
		restrict : 'E',
		template: "Authenticated: {{authenticated}} | requiresLogin: {{requiresLogin}}" +
				"<pre>{{debug}}</pre>"+
				"<pre>{{Session}}</pre>"
	};
});

MOW.controller('AppController', ['$rootScope','$http', 'Session', function($rootScope, $http, Session){

	$rootScope.Session = null;
	$rootScope.authenticated = null;
	$rootScope.requiresLogin = null;
	
	$rootScope.loadCurrentUser = function() {
		return $http.get('/api/me').then(function(res){ 
			$rootScope.Session = Session.create(res.data);
			$rootScope.authenticated = !!Session.User;
			console.log('added session info to scope');
		});
	}
}]);

MOW.run([
	'$rootScope', 
	'AuthService', 
	'AUTH_EVENTS', 
	'$location', 
	function( $rootScope, AuthService, AUTH_EVENTS ){
	
	$rootScope.$on('$routeChangeStart', function(event, next){
		console.log('Event', event, next);
		
		var requiresLogin = !!next.auth && !!next.auth.roles;
		$rootScope.requiresLogin = requiresLogin;
		console.log('requiresLogin? ', requiresLogin);
		
		if(next.$$route.originalPath != '/logout') {
			$rootScope.loadCurrentUser().then(function(){
				var authenticated = AuthService.isAuthenticated();
				$rootScope.authenticated = authenticated;
				
				if(requiresLogin && (!authenticated || !AuthService.isAuthorized(next.auth.roles))) {
					event.preventDefault();
					$rootScope.$broadcast(AUTH_EVENTS.loginRequired);
					$rootScope.redirectTo = next.$$route.originalPath;
				}
			});
		}
	});
}]);
