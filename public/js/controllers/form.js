var FormControllers = angular.module('FormControllers', []);
FormControllers.controller('FormCtrl', ['$scope', function($scope) {

}])
.directive("compareTo", function() {
	return {
		require : "ngModel",
		scope : {
			otherModelValue : "=compareTo"
		},
		link : function(scope, element, attributes, ngModel) {

			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function() {
				ngModel.$validate();
			});
		}
	};
})
.directive("alert",  function(){
	
	return {
		restrict:'E',
		templateUrl: 'views/_elements/alert.html'
	};
});