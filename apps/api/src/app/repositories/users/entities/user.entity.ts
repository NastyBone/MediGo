import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { IdEntity } from '../../base';
import { Roles } from '../enums';

@Entity()
export class User extends IdEntity {
  @ApiProperty()
  @IsString()
  @Column({ length: 256, nullable: false })
  firstName!: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 256, nullable: false })
  lastName!: string;

  @ApiProperty()
  @IsString()
  @Column({ length: 256, nullable: false, unique: true })
  email!: string;

  @ApiProperty()
  @IsString()
  @Index('user_role_index')
  @Column({ nullable: false, default: Roles.Paciente })
  role!: string;

  @ApiProperty()
  @IsBoolean()
  @Column({ nullable: false, default: true })
  status!: boolean;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 256, nullable: false })
  password!: string;
}
