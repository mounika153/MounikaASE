// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.routes'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.controller('homeCtrl', function($scope, $http, $state) {
    
   
     $scope.goSentiment = function() {
         $state.go('sentiment');
        }
     
     $scope.goAuthor = function() {
         $state.go('author');
        }
})

.controller('authorCtrl', function($scope, $http, $state) {
    
    
       $scope.getAuthor = function(searchURL) {
        var url= 'https://gateway-a.watsonplatform.net/calls/url/URLGetAuthor?apikey=46d29c612c22d9480980fced98606351f95a4b5c&outputMode=json&url='+searchURL;
        console.log(url);
        $http.get(url) 
            .success(function(data) { 
                console.log(data);
                $scope.result = data;
            }) 
            .error(function(err) { 
                console.log("data not received from url");
            }); 
        }
        
    
    
   
    
    
})

.controller('sentimentCtrl', function($scope, $http) {
    
    $scope.getSentiment = function(searchURL) {
        var url= 'https://gateway-a.watsonplatform.net/calls/url/URLGetTextSentiment?apikey=46d29c612c22d9480980fced98606351f95a4b5c&outputMode=json&url='+searchURL;
        console.log(url);
        
        $http.get(url) 
            .success(function(data) { 
               
                $scope.result = data;
            }) 
            .error(function(err) { 
                console.log("data not received from url");
            }); 
        }
});