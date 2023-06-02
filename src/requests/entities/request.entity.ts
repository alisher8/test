import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('requests')
  export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column({ default: 'Active' })
    status: string;
  
    @Column({ nullable: false })
    message: string;

    @Column({ nullable: true })
    comment: string;
  }
  