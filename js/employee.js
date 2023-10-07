function Employee(employeeName, payRate, hours) {
    this.employeeName = employeeName;
    this.payRate = payRate;
    this.hours = hours;
    this.biweeklySalary = function (){
        return this.employeeName + "'s Bi-weekly salary is " + (this.payRate * this.hours);
    }
};

let employee01 = new Employee("Tom", 15, 80);