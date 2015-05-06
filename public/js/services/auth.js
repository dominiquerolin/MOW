MOW.constant('AUTH_EVENTS', {
	loginRequired: 'login-required',
	loginFailed: 'login-failed',
	permissionRequired: 'permission-required',
	sessionTimeout: 'session-timeout'
});
MOW.factory('AuthService', ['$http', 'Session', function($http, Session){
	var auth = {};
	auth.login = function(credentials){
		return $http.post('/api/login', credentials)
		.then(function(res){
			if(res.data.status) {
				console.log('AuthService.login OK');
				return Session.create(res.data.data)["User"];
			} else {
				console.log('AuthService.login Failed');
			}
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
		var authorized = roles.indexOf(Session.User.role)!=-1;
		console.log('isAuthorized?', authorized, roles, Session.User.role);
		return authorized;
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
  		
