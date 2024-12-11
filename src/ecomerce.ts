class Customer {
    private name: string
    private address: string

    constructor(name: string, address: string){
        this.name = name
        this.address = address
    }
}

class Order {
    private customer: Customer;
    private payment: Payment = new Cash(0, 0)
    private orderDetails: OrderDetail[] = []
    private date: string
    private status: string

    constructor(customer: Customer, name: string, address: string, date: string, status: string){
        this.customer = customer
        this.date = date
        this.status = status
    }

    public addOrderDetail(orderDetail: OrderDetail){
        this.orderDetails.push(orderDetail)
    }

    public payOrder(payment: Payment){
        this.payment = payment
    }

    public calcSubTotal(){

    }

    public calcTax(){

    }

    public calcTotal(){

    }

    public calcTotalWeight(){

    }
}

class Item {
    private shippingWeight: number
    private description: string

    constructor(shippingWeight: number, description: string){
        this.shippingWeight = shippingWeight
        this.description = description
    }
}

class OrderDetail {
    private item: Item
    private quantity: number
    private taxStatus: string

    constructor(item: Item , quantity: number, taxStatus: string){
        this.item = item
        this.quantity = quantity
        this.taxStatus = taxStatus
    }

    public calcSubTotal(){

    }

    public calcWeight(){

    }

    public calcTax(){

    }
}

abstract class Payment{
    private amount: number

    constructor(amount: number){
        this.amount = amount
    }
}

class Check extends Payment {
    private name: string
    private bankID: string

    constructor(amount: number, name: string, bankID: string){
        super(amount)
        this.name = name
        this.bankID = bankID
    }
}

class Cash extends Payment {
    private cashTendered: number

    constructor(amount: number,cashTendered: number){
        super(amount)
        this.cashTendered =cashTendered
    }
}

class Credit extends Payment {
    private number: string
    private type: string
    private expDate: string

    constructor(amount: number,number: string, type: string, expDate: string){
        super(amount)
        this.number = number
        this.type = type
        this.expDate = expDate
    }
}