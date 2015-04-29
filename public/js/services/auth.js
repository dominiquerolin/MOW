MOW.constant('AUTH_EVENTS', {
	loginRequired: 'login-required',
	permissionRequired: 'permission-required'
});
MOW.factory('AuthService', ['$http', 'Session', function($http, Session){
	var auth = {};
	auth.login = function(credentials){
		return $http.post('/login', credentials)
		.success(function(res){
			console.log('AuthService.login OK', res);
			if(res.status) {
				Session.create(res.data);
			}
		})
		.error(function(){
			console.log('AuthService.login ERR');
		});
	};
	auth.isAuthenticated = function(){
		return !!Session.User;
	};
	auth.isAuthorized = function(roles){
		if(!angular.isArray(roles)) roles = [roles];
		return roles.indexOf(Session.User.role)!=-1;
	};
	return auth;
}]);
MOW.service('Session', function(){
	this.create = function(user) {
		this.User = user;
		return this;
	};
	this.destroy = function(){
		this.User = null;
		return this;
	};
});
MOW.controller('LoginController', ['$scope','AuthService', '$location', function($scope, AuthService, $location){
	$scope.credentials = {username:'', password:''};
	$scope.login = function(credentials){
		AuthService.login(credentials).then(function(res){

			console.log('LoginController RES', res.data);
			if(res.data.status) {
				console.log('Redirect to ','/users/' + res.data.data.username);
				$location.path('/users/' + res.data.data.username);
			}
			else {
				console.log('ERR', res.data.message);
				$scope.alert = res.data;
			}
			
		});
	}
}]);
// check Auth on each route change
MOW.run([
  	'$rootScope',
  	'AuthService',
  	'AUTH_EVENTS',
  	function( $rootScope, AuthService, AUTH_EVENTS) {
  		console.log('check auth');
  		$rootScope.$on(
  			'$routeChangeStart',
  			function(event, next) {				
  				if (next.data && next.data.authorizedRoles) {
  					if(!AuthService.isAuthenticated()) {
  						event.preventDefault();
	  					$rootScope.$broadcast(AUTH_EVENTS.loginRequired);
	  					console.log('login required');
	  				} else if(!AuthService.isAuthorized(next.data.authorizedRoles)) {
	  					event.preventDefault();
	  					$rootScope.$broadcast(AUTH_EVENTS.permissionRequired);
	  					console.log('permission required');
	  				}
  				} else console.log('public area');
  			});
  	} ]);