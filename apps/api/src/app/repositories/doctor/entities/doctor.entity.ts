import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { User } from '../../users/entities';
import { Speciality } from '../../speciality/entities';

@Entity()
export class Doctor extends IdEntity {
  @Column({ length: 256, nullable: false })
  phone!: string;

  @OneToOne(() => Speciality, (speciality) => speciality.id, {
    nullable: false,
  })
  @JoinColumn()
  speciality!: Speciality;

  @OneToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn()
  user!: User;
}
