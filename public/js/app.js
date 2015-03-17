angular
.module('MOW', ['ngRoute', 'appRoutes',
                'Navigation',
                'Forms',
                'User',
                'Volunteer'])
                       
// adds an optional argument to $location.path() to prevent reloading on url change
.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);