import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  image: string;

  @Column({ type: "simple-array" })
  tags: string[];

  @Column({
    name: "created_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    type: "datetime",
    nullable: true,
  })
  updatedAt: Date;
}
