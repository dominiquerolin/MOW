MOW.constant('AUTH_EVENTS', {
	loginRequired: 'login-required',
	permissionRequired: 'permission-required',
	sessionTimeout: 'session-timeout'
});
MOW.factory('AuthService', ['$http', 'Session', function($http, Session){
	var auth = {};
	auth.login = function(credentials){
		return $http.post('/api/login', credentials)
		.success(function(res){
			console.log('AuthService.login OK');
			if(res.status) {
				Session.create(res.data);
			}
		})
		.error(function(){
			console.log('AuthService.login ERR');
		});
	};
	auth.logout = function(){
		return $http.post('/api/logout')
		.success(function(res){
			console.log('AuthService.logout OK');
			Session.destroy();
		})
		.error(function(){
			console.log('AuthService.logout ERR');
		});
	};
	auth.isAuthenticated = function(){
		console.log('isAuthenticated?', !!Session.User);
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
		console.log('Session created');
		return this;
	};
	this.destroy = function(){
		this.User = null;
		console.log('Session destroyed');
		return this;
	};
});
  		
