angular.module('Navigation', [])
.controller('TabController', ['$scope', '$location','$route', function($scope,$location,$route){
	this.tab = $route.current.action;
	this.setTab = function(tabId) {
		
		if($location.path().indexOf(this.tab)<0) 
			var url = $location.path()+'/'+tabId;
		else 
			var url = $location.path().replace(this.tab, tabId);
		
		//console.log('curent url:'+$location.path(), 'current tab:'+this.tab)
		//console.log('new url:'+url, 'new tab:'+tabId);
		
		this.tab = tabId;
		$location.path(url, false);
		$scope.alert = {status:true,message:null};
	};
	this.isSet = function(tabId) {
		return this.tab === tabId;
	};
	return this;
}]);