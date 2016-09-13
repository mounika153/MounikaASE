function StoreDetails(options) {
    // some defaults
    this.username = options.name || localStorage.getItem("name");
    this.mobile=options.mobile || localStorage.getItem("mobile");
    this.root=options.root || "ASE LAB";
}

function DetailsFunction() {}

DetailsFunction.prototype.storageClass = StoreDetails;

DetailsFunction.prototype.createStorage = function ( options ) {
  return new this.storageClass( options );
};


