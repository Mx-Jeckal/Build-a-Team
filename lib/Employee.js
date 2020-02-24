class Employee {
    constructor(name, id, email) {
            //inputs
            this.name = name;
            this.id = id;
            this.email = email;
        }
        //functions
    getName() {
        return this.name
    };
    getId() {
        return this.id
    };
    getEmail() {
        return this.email
    };
    getRole() {
        return "Employee"
    }

}

module.exports = Employee