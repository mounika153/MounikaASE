// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
           
        }
    }
}
 
var Mixin  = function() {}
Mixin.prototype = {
  login: function(state){
    console.log( "login" );
      state.go("home");
  },
  register: function(state){
    console.log( "register" );
      state.go("register");
  },
  updateProfile: function(state){
    console.log( "update profile" );
      state.go("profile");
  }
};

function Admin() {
  this.deleteUser = function(){
    console.log( "delete user" );
  };
}
 
function User(){
  this.startShop = function(){
    console.log("start shopping")
  };
}

augment(User, Mixin);
augment(Admin, Mixin);
