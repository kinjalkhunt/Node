// import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

// @Entity({ name: 'admin' })
// export class Admin {
//   @PrimaryGeneratedColumn()
//   id: number | undefined;

//   @Column({ type: 'varchar', length: 30 })
//   name: string | undefined;

//   @Column({ type: 'varchar', length: 30 })
//   email: string | undefined;

//   @UpdateDateColumn({ type: 'timestamp' }) // Use timestamp for better date handling
//   createdAt: Date | undefined;
// }
// src/entities/admin/admin.ts
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin {
  @PrimaryGeneratedColumn()
  adminId: number | undefined;

  @Column({ type: 'varchar', length: 30 })
  name: string |undefined;

  @Column({ type: 'varchar', length: 30 })
  email: string | undefined;

  @UpdateDateColumn({ type: 'timestamp' })
  createdAt: Date | undefined;
}

