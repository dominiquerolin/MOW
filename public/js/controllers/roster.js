angular.module('Roster', [])
.controller('RosterController',
		[ '$rootScope', '$scope', '$http', 'WEEKDAYS', function($rootScope, $scope, $http, WEEKDAYS) {
			
			var roster = [];
			
			// get all volunteer availability
			$http.get('/api/volunteer').success(function(res) {
				// mash it up together
				var volunteers = res.data;
				for(v in volunteers) {
					var calendar = volunteers[v].availability.frequency;
					for(w in calendar) {
						for(d in calendar[w]) {
							if(!roster[w]) roster[w] = [];
							if(!roster[w][d]) roster[w][d] = [];
							if(calendar[w][d]) roster[w][d].push(volunteers[v].username);
						}
					}
				}
				// output global availability
				$rootScope.debug = roster;
				$scope.roster = roster;
				$scope.weekdays = WEEKDAYS;

			}).error(function(res) {
				$scope.alert = res;
			});

		} ]);