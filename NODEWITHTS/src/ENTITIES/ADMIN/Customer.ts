import { Entity,Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Order} from '../ADMIN/Order'


@Entity({name:'Customer'})

export class Customer {
    @PrimaryGeneratedColumn()
    customerid: number | undefined;

    @Column({type: 'varchar', length:'30'})
    name: string | undefined;

    @Column({type:'varchar', length: '30'})
    email: string | undefined;

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date | undefined;

    @Column({type:'varchar', length:'100'})
    address: string | undefined;

    @OneToMany(()=> Order, (order) => order.customer)
    orders: Order[] | undefined;
}