var VolunteerControllers = angular.module('VolunteerControllers',[]);

VolunteerControllers.controller('VolunteerListCtrl', ['$scope','$http', function($scope, $http) {
	console.log("VolunteerListCtrl");

    // when landing on the page, get all volunteers and show them
    $http.get('/api/volunteers')
        .success(function(data) {
            $scope.volunteers = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}]);

VolunteerControllers.controller('VolunteerFormCtrl', ['$scope','$http', '$window', function($scope, $http, $window) {
	console.log("FormController");
    $scope.formData = {};

    // when submitting the add form, send the text to the node API
    $scope.addVolunteer = function() {
    	$scope.formData.active = true; // default to active user on creation
    	$scope.error = {status:false, message: null};
    	
    	console.log("ADD from angular");
        $http.post('/api/volunteers', $scope.formData)
            .success(function(obj) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                console.log('Success:', obj);
                $window.location.href = '/volunteers/'+obj.username;
            })
            .error(function(msg) {
            	console.log(msg);
            	$scope.error = {status:true, message: msg};
            });
    };

    // delete a todo after checking it
    $scope.deleteVolunteer = function(index) {
    	var id = $scope.volunteers[index]._id;
        $http.delete('/api/volunteers/' + id)
            .success(function(data) {
            	$scope.volunteers.splice(index,1);
                console.log('Deleted volunteer with id:',id,data);
            })
            .error(function(data) {
                console.log('Error deleting volunteer with id:',id,data);
            });
   };
}]);

VolunteerControllers.controller('VolunteerProfileCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams) {
	 $http.get('/api/volunteers/'+$routeParams.username)
     .success(function(result) {
         $scope.v = result.data;
         $scope.s = result.schema;
         console.log(result.schema);
     })
     .error(function(data) {
         console.log('Error: ' + data);
     });
}]);
	