var imageApp=angular.module('starter', ['ionic','ngCordova','firebase']);

//var fb = new Firebase("https://brilliant-fire-9489.firebaseio.com/"); //ur firebase url

imageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

imageApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "templates/loginpage.html",
            controller: "LoginController",
            cache: false
        })
    .state("profile", {
            url: "/profile",
            templateUrl: "templates/profile.html",
            controller: "ProfileController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        })
    .state("home", {
            url: "/home",
            templateUrl: "templates/homepage.html",
            controller: "HomePageController"
        })
    .state("changePass", {
            url: "/changePass",
            templateUrl: "templates/changePass.html",
            controller: "ChangePassController"
        })
    .state("register", {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: "RegistrationController"
        });
    $urlRouterProvider.otherwise('/login');
});

imageApp.controller("LoginController", function($scope,$http, $state, $firebaseAuth, $cordovaBarcodeScanner, $httpParamSerializerJQLike,$q, $cordovaCamera) {

        $scope.barcodes = [];

    $scope.msg = localStorage.getItem("registerSuc");
    
    
    
    $scope.login = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+username+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        $state.go("login");
            }else{
                alert("mobile : "+data[0].mobile);
                alert("pass : "+data[0].firstname);
              if (username == data[0].mobile && password == data[0].password) {
                        localStorage.setItem("name" , data[0].firstname);
                        localStorage.setItem("lname" , data[0].lastname);
                        localStorage.setItem("mobile" , data[0].mobile);
                        localStorage.setItem("email" , data[0].email);
                        localStorage.setItem("address1" , data[0].address1);
                        localStorage.setItem("address2" , data[0].address2);
                        localStorage.setItem("city" , data[0].city);
                        localStorage.setItem("country" , data[0].country);
                        localStorage.setItem("password" , data[0].password);
                        /*localStorage.setItem("mobile" , data[0].mobile);*/
                  $state.go("home");
                    } else {
                       $scope.errormsg = "Invalid credentials"
                       $state.go("login");
                    }
            
            
            }
            

            })
             
        }
    
    $scope.delete = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+username+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                alert("null");
                  $scope.errormsg = "No user found"       
                        
            }else{
               
              if (username == data[0].name && password == data[0].password) {
                        /*localStorage.setItem("name" , username);
                  $state.go("login");*/
                  
                  $http({
                      method: 'DELETE' ,   
                url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                     }).success(function (data) {
                     alert("deleted");
                      $scope.sucmsg = "User deleted successfully"
                     })                  
                  
                    } else {
                       $scope.errormsg = "Invalid credentials"
                    }           
            
            }            

            })
             
        }
    
    

    $scope.register = function(username, password) {
                
        $state.go("register");
    }
    
    
            
        
});

//secure controller

imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

    /*$ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];

    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("login");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }*/

});


imageApp.controller("HomePageController", function($scope, $state,$http,$cordovaBarcodeScanner,$cordovaCamera) {
        var user = localStorage.getItem("name");
    $scope.user = "Welcome "+user;
    //alert("user : "+user);
    
    $scope.getWeather = function() {

    var url = document.getElementById('imageurl').value;
    $http.get('https://api.idolondemand.com/1/api/sync/recognizebarcodes/v1?url='+url+'&apikey=77c8a034-ae01-4f7f-ac7e-f28a5f55b374').success(function(data){
    
      console.log(data);
       
          name = data.barcode[0].text;
                
    $scope.st_place = name;
     $scope.image = url;   
    
                     
});
    
    
}; 
    
$scope.getDetails = function() {
    
     
    
     /*var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+document.getElementById('barcode').value+'&format=json';*/
    
    var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc=036000291452&format=json';
    
        //alert("url : "+url);
    $http.get(url).success(function(data){
    
        
      // alert("out");
      console.log(data);
       
          name = data.items[0].name;
       price = data.items[0].salePrice;
                
    $scope.end_place = name;
    $scope.price = price;    
    
                     
});
};    
    
    
     $scope.changePass = function() {
        // alert("in pass");
        // alert("name : "+localStorage.getItem("name"));
         
         $state.go("changePass");
     };
    
    $scope.updateUser = function(name, pw) {
           
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+name+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
     alert(data[0]._id.$oid);
      if (name == data[0].name ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/ase/collections/Patients/'+data[0]._id.$oid+'?apiKey=ZE5gPXuMklJoxOhGZbFKK2tLg7SXx96I',
		 data: JSON.stringify( { "$set" : { "password" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
            // alert(1);
             })
                
            } 
                 
    })
    
    };
    
    $scope.scans = [];
    $scope.scan = function() {
        alert("inside scan");
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
            
        // Success! Barcode data is here
            //alert("text : "+barcodeData.text);
            //alert("format : "+barcodeData.format);
            text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            
            
            //walmart
            var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+text+'&format=json';
    
                alert("url : "+url);
            $http.get(url).success(function(data){


              // alert("out");
              console.log(data);

                  name = data.items[0].name;
               price = data.items[0].salePrice;

                alert("name : "+name);
                alert("price : "+price);
                
            $scope.end_place = name;
            $scope.price = price;
            $scope.productdetails = "Product : "+name+" : Price : "+price;    
            
            $scope.scans.push( "Product : "+name+" : Price : "+price);    
            });
            
            /*$scope.barcodes.push( "Barcode is "+text+" with format "+format);*/
      },function(error) {
       alert("an error occured");
      });
    }
    
    $scope.getProfile = function(){
        
        
    }
    
 $scope.profile = function() {
alert("hi");
   $state.go("profile");
     }
});

imageApp.controller("RegistrationController", function($scope,$http, $state, $httpParamSerializerJQLike) {

    $scope.createUser = function(mobile) {
               console.log("inside login function");
        //var name = document.getElementById("username").value;
        alert("signup");
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        //var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var address1 = document.getElementById("address1").value;
        var address2 = document.getElementById("address2").value;
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        var pass = document.getElementById("pass").value;
        var repass = document.getElementById("repass").value;
        
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                alert("null");
                
                $http({
                    method: 'POST',
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
                    data: JSON.stringify({
                                //name: name,
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                mobile: mobile,
                                address1:address1,
                                address2:address2,
                                city:city,
                                country:country,
                                password:pass
                            }),
                    contentType: "application/json"
                }).success(function() {
                    alert("sucess");
                    $scope.userName ="";
                    $scope.password ="";
                    $scope.email ="";

                    var msg ="User created successfully";
                    localStorage.setItem("registerSuc",msg);
                    $state.go("login");
                        })
                
                       
                $state.go("login");
            }else{
                
                $scope.errormsg = "Mobile number already exists";
                
                    $state.go("register");
            
            }
            

            })
        
        
        //alert("name : "+name);
        
}
   
$scope.back = function() { 
     $state.go("login");
     }
});



imageApp.controller("ProfileController", function($scope,$http, $state, $httpParamSerializerJQLike) {
  
    
    
  var name = localStorage.getItem("name");
        $scope.name = name;
    var lname = localStorage.getItem("lname");
        $scope.lname = lname;
   var email = localStorage.getItem("email");
        $scope.email = email; 
    var mobile = localStorage.getItem("mobile");
        $scope.mobile = mobile;
    var address1 = localStorage.getItem("address1");
        $scope.address1 = address1;
    var address2 = localStorage.getItem("address2");
        $scope.address2 = address2;
   var city = localStorage.getItem("city");
        $scope.city = city; 
    var country = localStorage.getItem("country");
        $scope.country = country;
    var password = localStorage.getItem("password");
        $scope.password = password; 
     $scope.back = function() { 
     $state.go("home");
     }
    
    $scope.savechanges = function() {  
        
        
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var address1 = document.getElementById("address1").value;
        var address2 = document.getElementById("address2").value;
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        var pass = document.getElementById("pass").value;
        
        
        
        $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
    // alert(data[0]._id.$oid);
      
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
		 data: JSON.stringify( { "$set" : { "firstname" : firstname,"lastname" : lastname,"email" : email,"mobile" : mobile,"city" : city,"country" : country,"password" : pass,"address1":address1,"address2":address2 } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             alert("success");
              $scope.changemsg = "User details are changed successfully";
             })
                
            
                 
    })
    }

});


imageApp.controller("ChangePassController", function($scope,$http, $state, $httpParamSerializerJQLike) {

    var name = localStorage.getItem("name");
         $scope.name = "Welcome "+name;
   
   $scope.updateUser = function(pw) {
           
 var name = localStorage.getItem("name");
       $scope.name= "Welcome "+name;
       //alert("name : "+name);
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+name+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
    // alert(data[0]._id.$oid);
      if (name == data[0].name ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
		 data: JSON.stringify( { "$set" : { "password" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             alert("success");
              $scope.passmsg = "Password is changed successfully";
             })
                
            } 
                 
    })
    
    };

});
