import { Column, Entity } from 'typeorm';
import { IdEntity } from '../../base';

@Entity()
export class Speciality extends IdEntity {
  @Column({ length: 256, nullable: true })
  description: string;
}
