var UserLogin = (function () {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
   
      return { 
              
        Login:function($http,username,password,$scope,$state){
            //alert("Singleton function for login")
            user = new User();
            console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mongolab.com/api/1/databases/aselab7/collections/users?q={mobile:\''+username+'\'}&apiKey=BRAZaLJlcYe5QBqAEzUAhchG6H_jQx1k',
           
            contentType: "application/json"
        })
        .success(function(data){
           
            if(data==""){
                //alert("null");
                $scope.sucmsg ="";
                  $scope.errormsg = "No user found"       
                        $state.go("login");
            }else{
               // alert("mobile : "+data[0].mobile);
                //alert("pass : "+data[0].firstname);
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
                  user.login($state);
                  //$state.go("home");
                    } else {
                        
                       $scope.errormsg = "Invalid credentials"
                       //user.login();
                       $state.go("login");
                        
                    }
            
            
            }
            

            })
        }
        
        
        
    };
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})();



