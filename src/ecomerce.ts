class Customer {
    private name: string
    private address: string

    constructor(name: string, address: string){
        this.name = name
        this.address = address
    }

    public getInfo():string{
        return `Name : ${this.name}, \nAddress : ${this.address}`
    }
}

class Order {
    private customer: Customer;
    private payment: Payment = new Cash(0, 0)
    private orderDetails: OrderDetail[] = []
    private date: string
    private status: string

    constructor(customer: Customer, date: string , status: string){
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
        let subtotal = 0;
        for(let i = 0; i < this.orderDetails.length; i++){
            subtotal = this.orderDetails[i].calcSubTotal()
        }
        return subtotal
    }

    public calcTax(){
        let vat = 0;
        for(let i = 0 ;i <this.orderDetails.length; i++){
            vat = vat + this.orderDetails[i].calcTax()
        }
        return vat
    }

    public calcTotal(){
        return this.calcSubTotal() + this.calcTax()
    }

    public calcTotalWeight(){
        let weight = 0;
        for(let i = 0 ;i <this.orderDetails.length; i++){
            weight = weight + this.orderDetails[i].calcWeight()
        }
        return weight
    }
    public getPayment(){
        return this.payment
    }
    public printOrderDetails():void{
        for(let i=0; i< this.orderDetails.length; i++){
            this.orderDetails[i].printDetails()
        }
    }
}

class Item {
    private shippingWeight: number
    private description: string
    private price: number

    constructor(shippingWeight: number, description: string, price: number){
        this.shippingWeight = shippingWeight
        this.description = description
        this.price = price
    }

    public getPriceForQuantity(){
        return this.price
    }

    public getInfo(): string{
        return `Name : ${this.description}, Price : ${this.price} ฿, Weight : ${this.shippingWeight} kg`
    }

    public getTax(){
        return this.price * 0.07
    }
    public inStock(){
        return true
    }

    public getShippingWeight():number{
        return this.shippingWeight
    }
    public getName(){
        return this.description
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
        return this.quantity * this.item.getPriceForQuantity()
    }

    public calcWeight(){
        return this.quantity * this.item.getShippingWeight()
    }

    public calcTax(){
        if(this.taxStatus === 'not included'){
            return this.item.getTax()
        }
        return 0
    }
    public calcSubTotals(){
        return this.quantity * this.item.getPriceForQuantity()
    }
    public printDetails():void{
        console.log(this.item.getName() + "\t" + this.quantity +" ชิ้น \t" )
    }
}

abstract class Payment{
    private amount: number

    constructor(amount: number){
        this.amount = amount
    }
    public getAmount():number{
        return amount
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
    public getChange(): number{
        return this.cashTendered - this.getAmount()
    }
    public getCashTendered():number{
        return this.cashTendered
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

// Create Object

// Customer
const customer1 = new Customer('Thunva' , 'Kanchanaburi')
console.log(customer1.getInfo())

//Items
const item1= new Item(1.5, `Lotus's water`, 15)
const item2= new Item(0.05, `Lays`, 35)
const item3= new Item(0.15, `Mama`, 7)

console.log(item1.getInfo())
console.log(item2.getInfo())
console.log(item3.getInfo())

// Order
const order1 = new Order(customer1, '16/12/2567', 'inpro gress')

// OrderDetail
const orderDetail1 = new OrderDetail(item1, 1, 'not included')
const orderDetail2 = new OrderDetail(item2, 2, 'not included')
const orderDetail3 = new OrderDetail(item3, 5, 'not included')

// OrderDetail => Order
order1.addOrderDetail(orderDetail1)
order1.addOrderDetail(orderDetail2)
order1.addOrderDetail(orderDetail3)

const amount = order1.calcTotal()
//Payment
const cash = new Cash(amount, 1000)

order1.payOrder(cash)
console.log("######################### ORDER #################################")

console.log(order1.printOrderDetails())


console.log("subtotal: " + order1.calcSubTotal())
console.log("Vat: " + order1.calcTax())
console.log("Total: " + order1.calcTotal())
console.log("Recieve: "  + (order1.getPayment() as Cash).getCashTendered())
console.log("change: " + (order1.getPayment() as Cash).getChange())