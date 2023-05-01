import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { Doctor } from '../../doctor/entities';
import { Patient } from '../../patient/entities';

@Entity()
export class Record extends IdEntity {
  @Column({ length: 256, nullable: false })
  description!: string;

  @Column({ length: 256, nullable: false })
  date!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.id, { nullable: false })
  @JoinColumn()
  doctor!: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.id, { nullable: false })
  @JoinColumn()
  patient!: Patient;
}
