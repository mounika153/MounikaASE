var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'Login.html',
            controller: 'mainController'
    	})
    	.when('/directions', {
    		templateUrl: 'directions.html',
            controller: 'aboutController'
    	})
    	.when('/register', {
    		templateUrl: 'Register.html',
            controller: 'contactController'
    	});

});

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'home';
});

animateApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'directions';
});

animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'register';
});


function LoginController($scope) {
    
    $scope.logins = [];
    $scope.login = function (user, pwd) {
        localStorage.setItem("name" , user);
        window.location="directions.html";
    };
}






