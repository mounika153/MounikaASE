angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http) {
           
$scope.getWeather = function() {
alert("out");
    var url = document.getElementById('barcode').value;
    alert("url : "+url);
    var id= '1';
    $scope.id = id;
    $http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url='+url+'&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){
    /*$http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url=http://pbs.twimg.com/media/A9330s2CQAAFTRh.jpg&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){*/
    alert("in");
      console.log(data);
       
          name = data.barcode[0].text;
                alert("name : "+name);
        
    $scope.st_place = name;
     $scope.image = url;   
    
                     
});
    
    
};
    
$scope.getProducts = function() {
/*alert("out");
    var url = 'http://pbs.twimg.com/media/A9330s2CQAAFTRh.jpg';
    alert("url : "+url);
    var id= '1';
    $scope.id = id;
    $http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url=http://pbs.twimg.com/media/A9330s2CQAAFTRh.jpg&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){
    $http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url=http://pbs.twimg.com/media/A9330s2CQAAFTRh.jpg&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){
    alert("in");
      console.log(data);
       
          name = data.barcode[0].text;
                alert("name : "+name);
        
    $scope.st_place = name;
     $scope.image = url;   
    
                     
});*/
    
     $scope.productDetails=[{itemID: '12417832',itemName:'Baseball Case',itemPrice:'12.9'},
		   {itemID: '12417833',itemName:'Milky Bar Chocolate',itemPrice:'1.25'},
		   {itemID: '12417834',itemName:'HBO',itemPrice:'7.99'},
		   {itemID: '12417835',itemName:'Low fat milk',itemPrice:'3.99'}];
		   
            $scope.productPrice=function(itemPrice){
			   return itemPrice;
            }
            
    
    
};    
    
 $scope.getBarcodeDetails = function() {
    
     $scope.barcodeDetails=[{barcode: '0045557350017',type:'ean-13',country:'U.S'},
		   {barcode: '0045557350018',type:'ean-13',country:'Canada'},
		   {barcode: '0045557350019',type:'ean-12',country:'India'}];
		 
            $scope.getCountry=function(country){
			   return country;
			   
		   }
    
    
};     
 $scope.getStores = function() {
    
     $scope.storeDetails=[{name: 'walmart',state:'Missouri',type:'General'},
		   {name: 'Aldi',state:'Kansas',type:'groceries'},
		   {name: 'Bestbuy',area:'Kansas',type:'Electronic'}];
		   
            $scope.getType=function(type){
			   return type;
            }
            
    
    
};  
           
})


.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$scope.barcodes = [];
  $scope.getDetails = function() {
    alert("in");
     var url = 'http://api.walmartlabs.com/v1/items?apiKey=3jm7qhk5w9mrkh7hqcqzmxqr&upc='+document.getElementById('barcode1').value+'&format=json';
    /*var url = 'http://api.walmartlabs.com/v1/items?apiKey=3jm7qhk5w9mrkh7hqcqzmxqr&upc=10001137891&format=json';*/
    alert("url : "+url);
    $http.get(url).success(function(data){
    
        
       alert("out");
      console.log(data);
       
          name = data.items[0].name;
        price =data.items[0].salePrice;
                
    $scope.name = name;
        $scope.price = price;
        
        $scope.barcodes.push( "Name : "+name + " and Prices is $ "+price);
    
                     
});
};
    
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
