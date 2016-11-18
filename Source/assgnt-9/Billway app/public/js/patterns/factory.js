function StoreDetails(options) {
    // some defaults
    this.username = options.name || localStorage.getItem("name");
    this.mobile=options.mobile || localStorage.getItem("mobile");
    this.root=options.root || "ASE LAB";
}

// A constructor for defining new trucks


// Define a skeleton vehicle factory
function DetailsFunction() {}
// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
DetailsFunction.prototype.storageClass = StoreDetails;

// Our Factory method for creating new Vehicle instances
DetailsFunction.prototype.createStorage = function ( options ) {


    return new this.storageClass( options );
};


