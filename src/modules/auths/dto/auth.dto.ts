import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
