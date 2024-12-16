"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return `Name : ${this.name}, \nAddress : ${this.address}`;
    }
}
class Order {
    constructor(customer, date, status) {
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    addOrderDetail(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    payOrder(payment) {
        this.payment = payment;
    }
    calcSubTotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal = this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    getPayment() {
        return this.payment;
    }
    printOrderDetails() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetails();
        }
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getInfo() {
        return `Name : ${this.description}, Price : ${this.price} ฿, Weight : ${this.shippingWeight} kg`;
    }
    getTax() {
        return this.price * 0.07;
    }
    inStock() {
        return true;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    getName() {
        return this.description;
    }
}
class OrderDetail {
    constructor(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === 'not included') {
            return this.item.getTax();
        }
        return 0;
    }
    calcSubTotals() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    printDetails() {
        console.log(this.item.getName() + "\t" + this.quantity + " ชิ้น \t");
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return amount;
    }
}
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
    getCashTendered() {
        return this.cashTendered;
    }
}
class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
}
// Create Object
// Customer
const customer1 = new Customer('Thunva', 'Kanchanaburi');
console.log(customer1.getInfo());
//Items
const item1 = new Item(1.5, `Lotus's water`, 15);
const item2 = new Item(0.05, `Lays`, 35);
const item3 = new Item(0.15, `Mama`, 7);
console.log(item1.getInfo());
console.log(item2.getInfo());
console.log(item3.getInfo());
// Order
const order1 = new Order(customer1, '16/12/2567', 'inpro gress');
// OrderDetail
const orderDetail1 = new OrderDetail(item1, 1, 'not included');
const orderDetail2 = new OrderDetail(item2, 2, 'not included');
const orderDetail3 = new OrderDetail(item3, 5, 'not included');
// OrderDetail => Order
order1.addOrderDetail(orderDetail1);
order1.addOrderDetail(orderDetail2);
order1.addOrderDetail(orderDetail3);
const amount = order1.calcTotal();
//Payment
const cash = new Cash(amount, 1000);
order1.payOrder(cash);
console.log("######################### ORDER #################################");
console.log(order1.printOrderDetails());
console.log("subtotal: " + order1.calcSubTotal());
console.log("Vat: " + order1.calcTax());
console.log("Total: " + order1.calcTotal());
console.log("Recieve: " + order1.getPayment().getCashTendered());
console.log("change: " + order1.getPayment().getChange());
