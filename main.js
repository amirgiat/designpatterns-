// Design Patterns: Elements of Reusable Object-Oriented Software (1994) is a software engineering book describing software design patterns. The book was written by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides,
// with a foreword by Grady Booch. The book is divided into two parts,
// with the first two chapters exploring the capabilities and pitfalls of object-oriented programming, and the remaining chapters describing 23 classic software design patterns. The book includes examples in C++ and Smalltalk.
// It has been influential to the field of software engineering and is regarded as an important source for object-oriented design theory and practice. More than 500,000 copies have been sold in English and in 13 other languages.
// The authors are often referred to as the Gang of Four (GoF).[1]


//Creational

//Abstract factory pattern

// function Employee(name) {
//     this.name = name;

//     this.say = function () {
//         console.log("I am employee " + name);
//     };
// }

// function EmployeeFactory() {

//     this.create = function (name) {
//         return new Employee(name);
//     };
// }

// function Vendor(name) {
//     this.name = name;

//     this.say = function () {
//         console.log("I am vendor " + name);
//     };
// }

// function VendorFactory() {

//     this.create = function (name) {
//         return new Vendor(name);
//     };
// }

// function run() {
//     var persons = [];
//     var employeeFactory = new EmployeeFactory();
//     var vendorFactory = new VendorFactory();

//     persons.push(employeeFactory.create("Joan DiSilva"));
//     persons.push(employeeFactory.create("Tim O'Neill"));
//     persons.push(vendorFactory.create("Gerald Watson"));
//     persons.push(vendorFactory.create("Nicole McNight"));

//     for (var i = 0, len = persons.length; i < len; i++) {
//         persons[i].say();
//     }
// }

// run()


//Builder pattern

// function Shop() {
//     this.construct = function (builder) {
//         builder.step1();
//         builder.step2();
//         return builder.get();
//     }
// }

// function CarBuilder() {
//     this.car = null;

//     this.step1 = function () {
//         this.car = new Car();
//     };

//     this.step2 = function () {
//         this.car.addParts();
//     };

//     this.get = function () {
//         return this.car;
//     };
// }

// function TruckBuilder() {
//     this.truck = null;

//     this.step1 = function () {
//         this.truck = new Truck();
//     };

//     this.step2 = function () {
//         this.truck.addParts();
//     };

//     this.get = function () {
//         return this.truck;
//     };
// }

// function Car() {
//     this.doors = 0;

//     this.addParts = function () {
//         this.doors = 4;
//     };

//     this.say = function () {
//         console.log("I am a " + this.doors + "-door car");
//     };
// }

// function Truck() {
//     this.doors = 0;

//     this.addParts = function () {
//         this.doors = 2;
//     };

//     this.say = function () {
//         console.log("I am a " + this.doors + "-door truck");
//     };
// }

// function run() {
//     var shop = new Shop();
//     var carBuilder = new CarBuilder();
//     var truckBuilder = new TruckBuilder();
//     var car = shop.construct(carBuilder);
//     var truck = shop.construct(truckBuilder);

//     car.say();
//     truck.say();
// }

// run()


//Factory method pattern

var Factory = function () {
    this.createEmployee = function (type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;

        employee.say = function () {
            console.log(this.type + ": rate " + this.hourly + "/hour");
        }

        return employee;
    }
}

var FullTime = function () {
    this.hourly = "$12";
};

var PartTime = function () {
    this.hourly = "$11";
};

var Temporary = function () {
    this.hourly = "$10";
};

var Contractor = function () {
    this.hourly = "$15";
};

function run() {

    var employees = [];
    var factory = new Factory();

    employees.push(factory.createEmployee("fulltime"));
    employees.push(factory.createEmployee("parttime"));
    employees.push(factory.createEmployee("temporary"));
    employees.push(factory.createEmployee("contractor"));

    for (var i = 0, len = employees.length; i < len; i++) {
        employees[i].say();
    }
}

run()

//Prototype pattern

function CustomerPrototype(proto) {
    this.proto = proto;

    this.clone = function () {
        var customer = new Customer();

        customer.first = proto.first;
        customer.last = proto.last;
        customer.status = proto.status;

        return customer;
    };
}

function Customer(first, last, status) {

    this.first = first;
    this.last = last;
    this.status = status;

    this.say = function () {
        console.log("name: " + this.first + " " + this.last +
            ", status: " + this.status);
    };
}

function run() {

    var proto = new Customer("n/a", "n/a", "pending");
    var prototype = new CustomerPrototype(proto);

    var customer = prototype.clone();
    customer.say();
}


//Singleton pattern

var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

function run() {

    var instance1 = Singleton.getInstance();
    var instance2 = Singleton.getInstance();

    console.log("Same instance? " + (instance1 === instance2));
}


//Structural

// Adapter 

// old interface

function Shipping() {
    this.request = function (zipStart, zipEnd, weight) {
        // ...
        return "$49.75";
    }
}

// new interface

function AdvancedShipping() {
    this.login = function (credentials) { /* ... */ };
    this.setStart = function (start) { /* ... */ };
    this.setDestination = function (destination) { /* ... */ };
    this.calculate = function (weight) { return "$39.50"; };
}

// adapter interface

function ShippingAdapter(credentials) {
    var shipping = new AdvancedShipping();

    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}

function run() {

    var shipping = new Shipping();
    var credentials = { token: "30a8-6ee1" };
    var adapter = new ShippingAdapter(credentials);

    // original shipping object and interface

    var cost = shipping.request("78701", "10010", "2 lbs");
    console.log("Old cost: " + cost);

    // new shipping object with adapted interface

    cost = adapter.request("78701", "10010", "2 lbs");

    console.log("New cost: " + cost);
}

// Bridge 

// input devices

var Gestures = function (output) {
    this.output = output;

    this.tap = function () { this.output.click(); }
    this.swipe = function () { this.output.move(); }
    this.pan = function () { this.output.drag(); }
    this.pinch = function () { this.output.zoom(); }
};

var Mouse = function (output) {
    this.output = output;

    this.click = function () { this.output.click(); }
    this.move = function () { this.output.move(); }
    this.down = function () { this.output.drag(); }
    this.wheel = function () { this.output.zoom(); }
};

// output devices

var Screen = function () {
    this.click = function () { console.log("Screen select"); }
    this.move = function () { console.log("Screen move"); }
    this.drag = function () { console.log("Screen drag"); }
    this.zoom = function () { console.log("Screen zoom in"); }
};

var Audio = function () {
    this.click = function () { console.log("Sound oink"); }
    this.move = function () { console.log("Sound waves"); }
    this.drag = function () { console.log("Sound screetch"); }
    this.zoom = function () { console.log("Sound volume up"); }
};

function run() {

    var screen = new Screen();
    var audio = new Audio();

    var hand = new Gestures(screen);
    var mouse = new Mouse(audio);

    hand.tap();
    hand.swipe();
    hand.pinch();

    mouse.click();
    mouse.move();
    mouse.wheel();
}

// Composite 

var Node = function (name) {
    this.children = [];
    this.name = name;
}

Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },

    remove: function (child) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },

    getChild: function (i) {
        return this.children[i];
    },

    hasChildren: function () {
        return this.children.length > 0;
    }
}

// recursively traverse a (sub)tree

function traverse(indent, node) {
    console.log(Array(indent++).join("--") + node.name);

    for (var i = 0, len = node.children.length; i < len; i++) {
        traverse(indent, node.getChild(i));
    }
}

function run() {
    var tree = new Node("root");
    var left = new Node("left")
    var right = new Node("right");
    var leftleft = new Node("leftleft");
    var leftright = new Node("leftright");
    var rightleft = new Node("rightleft");
    var rightright = new Node("rightright");

    tree.add(left);
    tree.add(right);
    tree.remove(right);  // note: remove
    tree.add(right);

    left.add(leftleft);
    left.add(leftright);

    right.add(rightleft);
    right.add(rightright);

    traverse(1, tree);
}


// Decorator 

var User = function (name) {
    this.name = name;

    this.say = function () {
        console.log("User: " + this.name);
    };
}

var DecoratedUser = function (user, street, city) {
    this.user = user;
    this.name = user.name;  // ensures interface stays the same
    this.street = street;
    this.city = city;

    this.say = function () {
        console.log("Decorated User: " + this.name + ", " +
            this.street + ", " + this.city);
    };
}

function run() {

    var user = new User("Kelly");
    user.say();

    var decorated = new DecoratedUser(user, "Broadway", "New York");
    decorated.say();
}

// Facade 

var Mortgage = function (name) {
    this.name = name;
}

Mortgage.prototype = {

    applyFor: function (amount) {
        // access multiple subsystems...
        var result = "approved";
        if (!new Bank().verify(this.name, amount)) {
            result = "denied";
        } else if (!new Credit().get(this.name)) {
            result = "denied";
        } else if (!new Background().check(this.name)) {
            result = "denied";
        }
        return this.name + " has been " + result +
            " for a " + amount + " mortgage";
    }
}

var Bank = function () {
    this.verify = function (name, amount) {
        // complex logic ...
        return true;
    }
}

var Credit = function () {
    this.get = function (name) {
        // complex logic ...
        return true;
    }
}

var Background = function () {
    this.check = function (name) {
        // complex logic ...
        return true;
    }
}

function run() {
    var mortgage = new Mortgage("Joan Templeton");
    var result = mortgage.applyFor("$100,000");

    console.log(result);
}

// Flyweight 


function Flyweight(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
};

var FlyWeightFactory = (function () {
    var flyweights = {};

    return {

        get: function (make, model, processor) {
            if (!flyweights[make + model]) {
                flyweights[make + model] =
                    new Flyweight(make, model, processor);
            }
            return flyweights[make + model];
        },

        getCount: function () {
            var count = 0;
            for (var f in flyweights) count++;
            return count;
        }
    }
})();

function ComputerCollection() {
    var computers = {};
    var count = 0;

    return {
        add: function (make, model, processor, memory, tag) {
            computers[tag] =
                new Computer(make, model, processor, memory, tag);
            count++;
        },

        get: function (tag) {
            return computers[tag];
        },

        getCount: function () {
            return count;
        }
    };
}

var Computer = function (make, model, processor, memory, tag) {
    this.flyweight = FlyWeightFactory.get(make, model, processor);
    this.memory = memory;
    this.tag = tag;
    this.getMake = function () {
        return this.flyweight.make;
    }
    // ...
}

function run() {
    var computers = new ComputerCollection();

    computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
    computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
    computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
    computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

    console.log("Computers: " + computers.getCount());
    console.log("Flyweights: " + FlyWeightFactory.getCount());
}


// Proxy 

function GeoCoder() {

    this.getLatLng = function (address) {

        if (address === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (address === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (address === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (address === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    };
}

function GeoProxy() {
    var geocoder = new GeoCoder();
    var geocache = {};

    return {
        getLatLng: function (address) {
            if (!geocache[address]) {
                geocache[address] = geocoder.getLatLng(address);
            }
            console.log(address + ": " + geocache[address]);
            return geocache[address];
        },
        getCount: function () {
            var count = 0;
            for (var code in geocache) { count++; }
            return count;
        }
    };
};

function run() {

    var geo = new GeoProxy();

    // geolocation requests

    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");

    console.log("\nCache size: " + geo.getCount());
    
}



//Behavioral

// Chain
// Command 
// Interpreter 
// Iterator 
// Mediator 
// Memento 
// Observer 
// State 
// Strategy 
// Template 
// Visitor 