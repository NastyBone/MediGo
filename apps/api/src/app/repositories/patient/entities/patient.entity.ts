import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdEntity } from '../../base';
import { User } from '../../users/entities';

@Entity()
export class Patient extends IdEntity {
  @Column({ length: 800, nullable: false })
  address: string;

  @Column({ length: 256, nullable: false })
  phone: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn()
  user!: User;
}
