import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { User } from '../../users/entities';
import { Speciality } from '../../speciality/entities';

@Entity()
export class Doctor extends IdEntity {
  @Column({ length: 256, nullable: false })
  phone!: string;

  @ManyToOne(() => Speciality, (speciality) => speciality.id, {
    nullable: false,
  })
  @JoinColumn()
  speciality!: Speciality;

  @OneToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn()
  user!: User;
}
