angular.module('Forms', [])
.controller('FormController', [
     '$scope',
     '$http',
     '$location',
     function($scope, $http, $location){
    	 $scope.submitForm = function( frm ) {
    		 
    		 if(!frm.$valid) {
				$scope.alert = {
					error : true,
					message : 'Please fix the validation errors below.'
				};
				return;
			}

    		 
			var post_url = '';
			switch(frm.$name) {
				case 'User':
				case 'Register':
					post_url = '/api/users/';
					break;
				case 'VolunteerContact':
					$scope.data.phone = $scope.data.phone.filter(function(data){return data!=null;})
					post_url = '/api/volunteers/';
					break
				case 'VolunteerAvailability':
					post_url = '/api/volunteers/';
					break;
				case 'Driver':
					post_url = '/api/drivers/';
					break;
				default:
					$scope.alert = {
						status : false,
						message : 'No post url defined for "'+frm.$name+'".'
					};
					return;
			}
			post_url+=($scope.data._id?$scope.data._id:'');
			console.log("Form validation passed: submit form to "+post_url);
				
			
			$http.post(post_url, $scope.data)
			.success(function(result) {
				console.log('Success:', result);
				$scope.alert = {
					status : true,
					message : ($scope.data._id?'Update':'Creation')+' successful!'
				};

				if(frm.$name=='Register') {
					$location.path('/volunteers/'+$scope.data.username );
				} else {
					frm.$setPristine(); 
				}

			})
			.error(function(result) {
				console.log('Error:', result);
				$scope.alert = { status : false, message : result };
			});
			
			
    	 };
     }
 ])
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