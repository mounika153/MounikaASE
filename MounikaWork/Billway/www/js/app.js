var imageApp=angular.module('starter', ['ionic','ngCordova','chart.js']);


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
    .state("analysis", {
            url: "/analysis",
            templateUrl: "templates/analysis.html",
            controller: "AnalysisController"
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
        })
    .state("myBills", {
            url: "/myBills",
            templateUrl: "templates/myBills.html",
            controller: "MyBillsController"
        })
    .state("preInvoice", {
            url: "/preInvoice",
            templateUrl: "templates/preInvoice.html",
            controller: "PreInvoiceController"
        })
    .state("recommend", {
            url: "/recommend",
            templateUrl: "templates/recommendation.html",
            controller: "RecommendController"
       
        })
    
    .state("invoice", {
            url: "/invoice",
            templateUrl: "templates/invoice.html",
            controller: "InvoiceController"
        });
    $urlRouterProvider.otherwise('/login');
});

'use strict';

 //Controllers 
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['starter']);
});


//This is used for user to login into app and can to go to signup page

imageApp.controller("LoginController", function($scope,$http, $state, $firebaseAuth, $cordovaBarcodeScanner, $httpParamSerializerJQLike,$q, $cordovaCamera,$cordovaToast) {

        $scope.barcodes = [];

    $scope.sucmsg = localStorage.getItem("registerSuc");
    var user = new User();
    
    
    
    $scope.login = function(username, password) {
       
        userLogin = UserLogin.getInstance()
        userLogin.Login($http,username,password,$scope,$state)
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
               $scope.errormsg = "No user found"       
                        
            }else{
               
              if (username == data[0].name && password == data[0].password) {
                  
                  $http({
                      method: 'DELETE' ,   
                url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                     }).success(function (data) {
                      $scope.sucmsg = "User deleted successfully"
                     })                  
                  
                    } else {
                       $scope.errormsg = "Invalid credentials"
                    }           
            
            }            

            })
             
        }
    
    

    $scope.register = function(username, password) {
         user.register($state);
    }
        
});

//This is to get analysis of all purchases made by user, as graph

imageApp.controller("AnalysisController", function($scope, $http,$state) {

   var mobile = localStorage.getItem("mobile");
      $http({
                    type: "GET",
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                    contentType: "application/json"
                })
                .success(function(data){

                   var category=[];
                      var label=[];
                      var values=[];
                      var preRecords = data[0].products;
                        var category1=[];
                        var category2=[];
                        category1.push("Category");
                        category1.push("Value");
                        category2.push(category1);
                        category1=[];

                      for ( var i = 0; i < preRecords.length; i++ ) {
                                var temp = preRecords[i].split("|");
                          if(temp[2]!=""){
                               category.push(temp[2]);
                          }

                            }
                       var a = [], b = [], prev;

                                    category.sort();
                            for ( var i = 0; i < category.length; i++ ) {
                                        if ( category[i] !== prev ) {
                                            a.push(category[i]);
                                            b.push(1);
                                        } else {
                                            b[b.length-1]++;
                                        }
                                        prev = category[i];
                                    }

                              for ( var i = 0; i < b.length; i++ ) {
                                        label.push(a[i]);
                                        values.push(b[i]);
                                category1.push(a[i]);
                                  
                                  
                                  category1.push(b[i]);
                                  category2.push(category1);
                                  category1 = [];

                                    }
                    $scope.labels = label;
                var data = google.visualization.arrayToDataTable(category2);
          
          
	var options = {
          title: 'Category Analysis',
        backgroundColor: 'violet',
           
            height: 400
        
        };
        var chart = new google.visualization.PieChart(document.getElementById('chartdiv'));
        chart.draw(data, options);
         
            })
      
      
      
      $scope.goBack = function() {
          
          $state.go("home");
      }

});

//This is home page controller, where user can scan the items and have links to go to mybills page, profile page, recommendations and analysis page

imageApp.controller("HomePageController", function($scope, $state,$http,$cordovaBarcodeScanner,$cordovaCamera,$ionicSideMenuDelegate) {
        
     var appUser = new User();
    
    var detailsStorage = new DetailsFunction();
        var details = detailsStorage.createStorage({});
    
    var username = details.username;
    var mobileNum = details.mobile;
    
        var user = localStorage.getItem("name");
    $scope.user = "Welcome "+username;
    $scope.mobile = "Mobile : "+mobileNum
   
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
    
     
    
     var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+document.getElementById('barcode').value+'&format=json';
 
    $http.get(url).success(function(data){
    
        console.log(data);
       
          name = data.items[0].name;
       price = data.items[0].salePrice;
                
    $scope.end_place = name;
    $scope.price = price;    
    
                     
});
};    
    
    
     $scope.changePass = function() {
         $state.go("changePass");
     };
    
    $scope.updateUser = function(name, pw) {
           
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+name+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
     //alert(data[0]._id.$oid);
      if (name == data[0].name ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/ase/collections/Patients/'+data[0]._id.$oid+'?apiKey=ZE5gPXuMklJoxOhGZbFKK2tLg7SXx96I',
		 data: JSON.stringify( { "$set" : { "password" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             })
                
            } 
                 
    })
    
    };
    
    $scope.scans = [];
    $scope.productName = [];
    $scope.productPrice = [];
    $scope.product = [];
    $scope.productNo = 0;
    
    $scope.scan = function() {
       
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
            
            text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            
            
            //walmart
            var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+text+'&format=json';
    
                $http.get(url).success(function(data){
                    console.log(data);

                  name = data.items[0].name;
               price = data.items[0].salePrice;
                categoryPath = data.items[0].categoryPath;

             
            $scope.end_place = name;
            $scope.price = price;
            var category =    categoryPath.split("/");
            $scope.productdetails = "Product : "+name+" : Price : "+price;  
                
            
            $scope.productName.push(name); 
            $scope.productPrice.push(price);
          
            $scope.product.push(name+"|"+price+"|"+category[1]);
              
                
            $scope.productNo = $scope.productNo +1;    
            $scope.scans.push( $scope.productNo+" : Product : "+name+" : Price : "+price); 
               
            });
           
      },function(error) {
       alert("an error occured");
      });
    }
    
    $scope.doneScan = function(){
        
         $scope.scans = "";      
        var itemList =[];
        
            
        for(var i=0;i<$scope.product.length;i++){
            localStorage.setItem("itemList"+i,$scope.product[i]);
            }
        
       
        localStorage.setItem("productLength",$scope.product.length);
       
        $state.go("invoice");
        
    }
    
    
    $scope.getProfile = function(){
        
        
    }
    
 $scope.profile = function() {
   appUser.updateProfile($state);
     }
 $scope.logout = function() {
     localStorage.setItem("registerSuc","");
   $state.go("login");
     }
 
 $scope.myBills = function() {
    
     var dates;
     
     $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/products?q={mobile:\''+mobileNum+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
               
                $state.go("myBills");
                      
            }else{
               
                for(var i=0;i<data.length;i++){
                   
                    if(i==0){dates = data[i].date;}
                    else{dates = dates+","+data[i].date;}
                    
                }
                
                 localStorage.setItem("dates" ,dates);
                
                $state.go("myBills");
                  
            }
     })

   
     }
 
 $scope.recomend = function(){
     $state.go("recommend");
     
 }
 
 
 $scope.showCharts = function(){
     location.reload();
     $state.go("analysis");
     
 }
 
//In this user can register for app
 
imageApp.controller("RegistrationController", function($scope,$http, $state, $httpParamSerializerJQLike) {

    $scope.createUser = function() {
               console.log("inside login function");
        
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var address1 = document.getElementById("address1").value;
        var address2 = document.getElementById("address2").value;
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        var pass = document.getElementById("pass").value;
        var repass = document.getElementById("repass").value;
        //alert("mobile : "+mobile);
        if(firstname==""){
            $scope.errormsg = "Please enter First Name";
        }else if(mobile == ""){
            $scope.errormsg = "Please enter Mobile number";
        }else if(email == ""){
            $scope.errormsg = "Please enter Email Addess";
        }else if(pass == ""){
            $scope.errormsg = "Please enter password";
        }else if(pass != repass){
            $scope.errormsg = "Passwords doesnot match";
        }else{
            
            $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
               // alert("null");
                
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
                    //alert("sucess");
                    $scope.userName ="";
                    $scope.password ="";
                    $scope.email ="";

                    var msg ="User created successfully";
                    localStorage.setItem("registerSuc",msg);
                    $state.go("login");
                        })
                
            }else{
                
                $scope.errormsg = "Mobile number already exists";
                
                    $state.go("register");
            
            }
            

            })
            
        }
        
      
}
   
$scope.back = function() { 
     $state.go("login");
     }
});


// In this user can update his profile
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
       
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
		 data: JSON.stringify( { "$set" : { "firstname" : firstname,"lastname" : lastname,"email" : email,"mobile" : mobile,"city" : city,"country" : country,"password" : pass,"address1":address1,"address2":address2 } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             //alert("success");
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
       
       $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={name:\''+name+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
        contentType:"application/json"
        
    }).success(function(data){
      if (name == data[0].name ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/users/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
		 data: JSON.stringify( { "$set" : { "password" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
              $scope.passmsg = "Password is changed successfully";
             })
                
            } 
                 
    })
    
    };

});

//In this user can view his invoice after shopping 
imageApp.controller("InvoiceController", function($scope, $http, $state, $cordovaBarcodeScanner) {
    
    
$scope.product = [];
    $scope.productDB = [];
    var tax =0;
    var total=0;
    
     
    var productLen = localStorage.getItem("productLength");
     
    for(var i=0;i<productLen;i++){
           
        var prodTemp = localStorage.getItem("itemList"+i);
       
        if(prodTemp !=""){
            $scope.productDB.push(prodTemp);
       
        var prodTemp1 = prodTemp.split("|");
        total = total+parseFloat(prodTemp1[1]);
      
        $scope.product.push({productName:prodTemp1[0],productPrice:prodTemp1[1],index:i})
        }
        
    }
    
    $scope.productLen = $scope.product.length;
    
    $scope.total = Math.round(total * 100) / 100;
    $scope.tax = Math.round((($scope.total * 5)/100) * 100) / 100;
    $scope.amount  =  Math.round(($scope.total +  $scope.tax)*100) / 100;;  
   
    $scope.deleteItem = function(index) {
        localStorage.setItem("itemList"+index,"");
        
        location.reload();
        
    }
    
    $scope.addItem = function() {
        
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
           text = barcodeData.text;
            format = barcodeData.format;
            $scope.barcode = text;
            $scope.format = format;
            $scope.msg = "Barcode is "+text+" with format "+format
            
            
            //walmart
            var url = 'http://api.walmartlabs.com/v1/items?apiKey=avwybe6h7zkrmwvr3mqbs3r3&upc='+text+'&format=json';
    
            $http.get(url).success(function(data){
                console.log(data);

                  name = data.items[0].name;
               price = data.items[0].salePrice;

              var preProdLen = $scope.productLen;
                 $scope.productLen = parseInt($scope.productLen)+1;
                var productItem = name+"|"+price;
                localStorage.setItem("itemList"+preProdLen,productItem);
              
                localStorage.setItem("productLength",$scope.productLen);
            $scope.product.push({productName:name,productPrice:price,index:$scope.productLen})
            
              var total = parseFloat($scope.total)+parseFloat(price);     

            $scope.total = Math.round(total * 100) / 100;
            $scope.tax = Math.round((($scope.total * 5)/100)*100)/100;
            $scope.amount  =  Math.round(($scope.total +  $scope.tax)*100) / 100;
                
                 location.reload();
            
            });
            
            
      },function(error) {
       alert("an error occured");
      });
        
        
     
    }
    
    
    $scope.confirm = function() {
       
        var productLen = localStorage.getItem("productLength");
       
    for(var i=0;i<productLen;i++){
        
            localStorage.setItem("itemList"+i,"");
        
        }
        
        var prodList = $scope.productDB;
        
        var mobile = localStorage.getItem("mobile");
        
        var date = new Date();
     var mon = date.getMonth();
     var mon1 = parseInt(mon)+1;
    
     var actualDate = mon1+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();    
        $http({
                    method: 'POST',
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/products?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
                    data: JSON.stringify({
                       mobile: mobile,
                        products:prodList,
                        date:actualDate
                     }),
                    contentType: "application/json"
                }).success(function() {
                    
                $http({
                    type: "GET",
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                    contentType: "application/json"
                })
                .success(function(data){

                   var preRecords = data[0].products;
                    for(var i=0;i<prodList.length;i++){
                        preRecords.push(prodList[i]);
                    }
                 
                  $http({
                      method: 'PUT' ,   
                        url: 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation/'+data[0]._id.$oid+'?apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
                         data: JSON.stringify( { "$set" : { "products" : preRecords } } ),

                          contentType: "application/json"
                             }).success(function (data) { 
                            $state.go("home");
                      localStorage.setItem("saveSuccess","Invoice has been saved successfully");
                     location.reload();
                             })
      
            })
    
        })
   
     }       

    
});

//in  this user can view his previous bils    
imageApp.controller("MyBillsController", function($scope, $http, $state) {

   $scope.user = "Welcome : "+localStorage.getItem("name");
    
    var dates = localStorage.getItem("dates");
    
    $scope.dates = [];
    var actualDates = dates.split(",");
    
    for(var i=0;i<actualDates.length;i++){
        $scope.dates.push(actualDates[i]);
    }
    
    $scope.thisBill = function(date) {
        localStorage.setItem("invoiceDate",date);
        $state.go("preInvoice");
    }
   
});


//In this user can view his inovoice

imageApp.controller("PreInvoiceController", function($scope, $http) {

   var date = localStorage.getItem("invoiceDate");
    var mobile = localStorage.getItem("mobile");
    $scope.products = [];
    var total = 0;
    
    
 $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/products?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                $state.go("myBills");
                      
            }else{
               
                for(var i=0;i<data.length;i++){
                  if(date == data[i].date){
                      
                      for(var j=0;j<data[i].products.length;j++){
                           var prodTemp1 = data[i].products[j].split("|");
                            total = total+parseFloat(prodTemp1[1]);
                            
                            $scope.products.push({productName:prodTemp1[0],productPrice:prodTemp1[1]})
                           
                            }
                        $scope.total = Math.round(total * 100) / 100;
                        $scope.tax = ($scope.total * 5)/100;
                        $scope.amount  =  Math.round(($scope.total +  $scope.tax)*100) / 100;; 
                  }
                    
                    
                }
                
            }
     })
    
});

// In this user can view his recommendations for his next purchase    
imageApp.controller("RecommendController", function($scope, $http,$state) {

    var mobile = localStorage.getItem("mobile");
      $http({
                    type: "GET",
                    url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/recommendation?q={mobile:\''+mobile+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',

                    contentType: "application/json"
                })
                .success(function(data){

                   var preRecords = data[0].products;
          var recordsCounter = [];
          $scope.records = [];
           $scope.recordsDis = [];
                              
                         var a = [], b = [], prev;
    
                        preRecords.sort();
                        for ( var i = 0; i < preRecords.length; i++ ) {
                            if ( preRecords[i] !== prev ) {
                                a.push(preRecords[i]);
                                b.push(1);
                            } else {
                                b[b.length-1]++;
                            }
                            prev = preRecords[i];
                        }
          
                        for ( var i = 0; i < b.length; i++ ) {
                            recordsCounter.push(b[i]+"/"+a[i]);
                             $scope.records.push({index:i+1,productName:a[i],productQuantity:b[i]})
                             var name = a[i].split("|");
                             $scope.recordsDis.push(i+1+" : "+name[0]);
                        }
                       
      
            })
   
    $scope.addToCart = function(date) {
                
        $scope.test=[];
        
        $scope.test.push("Coleman Twin Single High Airbed|20.97|Sports & Outdoors");
        $scope.test.push("NIVEA Men Express Absorption Revitalizing Lotion, 16.9 fl oz|5.92|Beauty");
        $scope.test.push("Head & Shoulders Clinical Strength Dandruff Shampoo, 13.5 fl oz|6.78|Beauty");
        
        for(var i=0;i<$scope.test.length;i++){
            localStorage.setItem("itemList"+i,$scope.test[i]);
           
        }
        
       
        localStorage.setItem("productLength",$scope.test.length);
       //  localStorage.setItem("productLength",$scope.product.length);
               
        $state.go("invoice");
    }
    
    
});
