"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
class Order {
    constructor(customer, name, address, date, status) {
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
    }
    calcTax() {
    }
    calcTotal() {
    }
    calcTotalWeight() {
    }
}
class Item {
    constructor(shippingWeight, description) {
        this.shippingWeight = shippingWeight;
        this.description = description;
    }
}
class OrderDetail {
    constructor(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
    }
    calcWeight() {
    }
    calcTax() {
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
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
}
class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
}
