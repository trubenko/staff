// Фабрику стоит использовать, если в конструкторе у вас очень высокая сложность создания обьекта, чаще всего, когда он
// может создаваться из нескольких источников. Также она отлично подходит, когда вам нужно создавать много обьектов с
// одинаковыми полями. Но также, она может создать дополнительную сложность в приложении там, где ее можно было бы избежать.

class Employee {
    create (type) {
        let employee;
        if (type === 'fulltime') {
            employee = new Fulltime()
        } else if (type === 'parttime') {
            employee = new PartTime()
        } else if (type === 'temporary') {
            employee = new Temporary()
        } else if (type === 'contractor') {
            employee = new Contractor()
        }
        employee.type = type;
        employee.say = function () {
            console.log(`${this.type}: rate ${this.rate}/hour`)
        };
        return employee;
    }
}

class Fulltime {
    constructor () {
        this.rate = '$12'
    }
}

class PartTime {
    constructor () {
        this.rate = '$11'
    }
}

class Temporary {
    constructor () {
        this.rate = '$10'
    }
}

class Contractor {
    constructor () {
        this.rate = '$15'
    }
}

const factory = new Employee();
let fulltime = factory.create('fulltime');
let parttime = factory.create('parttime');
let temporary = factory.create('temporary');
let contractor = factory.create('contractor');

fulltime.say();
parttime.say();
temporary.say();
contractor.say();