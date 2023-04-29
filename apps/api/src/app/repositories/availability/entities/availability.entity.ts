import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { Doctor } from '../../doctor/entities';

@Entity()
export class Availability extends IdEntity {
  @Column({ length: 256, nullable: false })
  time!: string;

  @Column({ length: 256, nullable: false })
  date!: string;

  @Column({ nullable: false })
  available!: boolean;

  @ManyToOne(() => Doctor, (doctor) => doctor.id, { nullable: false })
  @JoinColumn()
  doctor!: Doctor;
}
