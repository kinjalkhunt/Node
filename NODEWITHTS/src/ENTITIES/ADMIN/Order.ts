// import { timeStamp } from 'console';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';


@Entity({name : 'Order'})
export class Order {
    @PrimaryGeneratedColumn()
    Orderid: number | undefined;

    @Column({type:'timestamp'})
    orderDate: Date | undefined;

    @Column({type:'int'})
    quantity: number | undefined;

    @ManyToOne(() => Customer, (Customer) => Customer.orders)
    @JoinColumn ({ name: 'customerid' })  // Foreign key in the Order table
    customer: Customer | undefined;
}