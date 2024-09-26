import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from 'typeorm';
// import { Category } from './Category';
@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // @ManyToOne(() => Category, category => category.Products) // Define the relationship
  // category!: Category;


  @UpdateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
