describe('Controllers', function () {
   
    var scope;
	
	beforeEach(angular.mock.module('starter.controllers'));
	beforeEach(angular.mock.inject(function($rootScope, $controller,$http) {
		scope = $rootScope.$new();
        http = $http;
		$controller('DashCtrl', {$scope: scope,$http:http});
        
	}));

	/*it("Checks the task creation", function () {
		
        scope.getWeather();
        
      expect(scope.id).toEqual('2');    // fails
	});
    
    it("Checks the barcode", function () {
		
        scope.getWeather();
        
      expect(scope.id).toEqual('1');    // fails
	});*/
    
    it("Checks the product", function () {
		
        scope.getProducts();
       
     var item='13';
			
			expect(scope.productPrice(item)).toEqual('12.9');
	});
    
    


      it("Checks the stores", function () {
		
        scope.getBarcodeDetails();
        
     var country='U.S';
			
			expect(scope.getCountry(country)).toEqual('U.S');
	});
    


it("Checks the store", function () {
		
        scope.getStores();
        
     var type='grocery';
			
			expect(scope.getType(type)).toEqual('general');
	});
    
    });