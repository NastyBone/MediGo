import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { User } from '../../users/entities';
import { Doctor } from '../../doctor/entities';

@Entity()
export class Assistant extends IdEntity {
  @Column({ length: 256, nullable: false })
  name!: string;

  @OneToOne(() => Doctor, (doctor) => doctor.id, { nullable: false })
  @JoinColumn()
  doctor!: Doctor;

  @OneToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn()
  user!: User;
}
