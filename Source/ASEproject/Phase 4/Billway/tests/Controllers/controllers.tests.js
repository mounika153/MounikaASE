describe('LoginController', function () {
    
    
    var scope;
	
	beforeEach(angular.mock.module('starter'));
	/*beforeEach(angular.mock.inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
       
		$controller('LoginController', {$scope: scope});
        
	}));*/

	
    describe('Login Controller', function(){

    it('Login No data', inject(function($controller,$rootScope) {
      //spec body
      scope = $rootScope.$new();
      var view1Ctrl = $controller('LoginController',{$scope: scope});
      scope.login("a","a");
      expect(scope.errorMsg).toEqual("No User found");
    }));
        
    it('Login Invalid data', inject(function($controller,$rootScope) {
      //spec body
      scope = $rootScope.$new();
      var view1Ctrl = $controller('LoginController',{$scope: scope});
      scope.login("a","a");
      expect(scope.errorMsg).toEqual("Invalid Credentials");
    }));    

  });
    
    
    describe('Registration Controller', function(){

    it('Data already exists', inject(function($controller,$rootScope) {
      //spec body
      scope = $rootScope.$new();
      var view1Ctrl = $controller('RegistrationController',{$scope: scope});
      scope.createUser("123");
      expect(scope.errorMsg).toEqual("Mobile number already exists");
    }));
        
    it('Login Invalid data', inject(function($controller,$rootScope) {
      //spec body
      scope = $rootScope.$new();
      var view1Ctrl = $controller('LoginController',{$scope: scope});
      scope.login("a","a");
      expect(scope.errorMsg).toEqual("Invalid Credentials");
    }));    

  });
    
    
    it("Checks the product", function () {
		/*var size = scope.tasks.length;
		scope.createTask({ title: 'Hello' });
		expect(scope.tasks.length).toEqual(size+1);*/
        scope.login("a","b");
        //expect(scope.id).toEqual('0045557350017');   // succeeds
        //expect(scope.st_place).toEqual('1');   // succeeds
    
			
			expect(scope.errorMsg).toEqual('No user found');
	});
    
    it("Checks the barcode", function () {
		
        scope.login('m','b');
    			
			expect(scope.errorMsg).toEqual('Invalid credentials');
	});
    
    
    

});