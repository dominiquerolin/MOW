
var MOW = angular.module('MOW', ['ngRoute', 'appRoutes',
                'Navigation',
                'Forms',
                'User',
                'Volunteer',
                'Roster']);

MOW.constant('WEEKDAYS', ['Monday','Tuesday','Wednesday','Thursday','Friday']);  
MOW.directive("alert", function(AUTH_EVENTS) {
	return {
		restrict : 'E',
		templateUrl : 'views/modal/alert.html',

		link : function (scope) {
			scope.$on('$routeChangeStart', function(){scope.alert = {};});
			scope.$on(AUTH_EVENTS.loginRequired, function(){scope.alert = {status:false, message:'This page is accessible to members only. Please login.'};});
			scope.$on(AUTH_EVENTS.loginFailed, function(){scope.alert = {status:false, message:'Login failed. Please make sure your username and password are correct.'};});
			scope.$on(AUTH_EVENTS.permissionRequired, function(){scope.alert = {status:false, message:'You do not have the proper access permissions to view this page.'};});
			scope.$on(AUTH_EVENTS.sessionTimeout, function(){scope.alert = {status:false, message:'Session timed out. Please login again.'};});
		}
	};
});
MOW.directive("loginForm", ['AUTH_EVENTS', function(AUTH_EVENTS) {
	return {
		restrict : 'E',
		templateUrl : 'views/user/login.html',
		link : function (scope) {
			scope.$on('$routeChangeStart', function(){scope.requiresLogin = false;});
			scope.$on(AUTH_EVENTS.loginRequired, function(){scope.requiresLogin = true;});
			scope.$on(AUTH_EVENTS.sessionTimeout, function(){scope.requiresLogin = true;});
		}

	};
}]);

MOW.directive("debug", function() {
	return {
		restrict : 'E',
		template: "<pre>requiresLogin: {{requiresLogin}} | Authenticated: {{authenticated}} | Authorized: {{authorized}}</pre>" +
				"<pre>{{debug}}</pre>"+
				"<pre>{{Session}}</pre>"
	};
});

MOW.controller('AppController', ['$rootScope','$http', 'Session', function($rootScope, $http, Session){

	console.clear();
	
	$rootScope.Session = null;
	$rootScope.requiresLogin = null;
	$rootScope.authenticated = null;
	$rootScope.authorized = null;
	
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
		//console.clear();
		
		var requiresLogin = $rootScope.requiresLogin = !!next.auth && !!next.auth.roles;
		console.log('requiresLogin? ', requiresLogin);
		
		if(next.$$route.originalPath != '/logout') {
			$rootScope.loadCurrentUser().then(function(){
				var authenticated = $rootScope.authenticated = AuthService.isAuthenticated();
				var authorized = $rootScope.authorized = !requiresLogin || (authenticated && AuthService.isAuthorized(next.auth.roles));
				
				if(requiresLogin) {
					event.preventDefault();
					if(!authenticated) {
						$rootScope.$broadcast(AUTH_EVENTS.loginRequired);
						$rootScope.redirectTo = next.$$route.originalPath;
					}
					else if(!authorized) {
						console.log(AUTH_EVENTS.permissionRequired);
						$rootScope.$broadcast(AUTH_EVENTS.permissionRequired);
						$rootScope.redirectTo = '/';
					}
					
				}
			});
		}
	});
}]);
