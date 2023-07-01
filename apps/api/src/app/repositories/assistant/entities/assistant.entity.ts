import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { User } from '../../users/entities';
import { Doctor } from '../../doctor/entities';

@Entity()
export class Assistant extends IdEntity {
  @OneToOne(() => Doctor, (doctor) => doctor.id, { nullable: true })
  @JoinColumn()
  doctor!: Doctor;

  @OneToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn()
  user!: User;
}
