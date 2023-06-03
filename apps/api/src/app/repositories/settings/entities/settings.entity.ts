import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryColumn({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  id: string;

  @Column({ nullable: true })
  value: string;
}
