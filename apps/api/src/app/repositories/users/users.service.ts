import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { hashPassword } from '../../auth/password-hasher/password-hasher';
import { CrudRepository } from '../../common/use-case';
import { MailService } from '../../mail/mail.service';
import { UpdateUserDto } from './dto/update-entities.dto';
import {
  ResponseUserDto,
  ResponseUserPatientDto,
} from './dto/users-response.dto';
import { User } from './entities';
import { Roles } from './enums';

@Injectable()
export class UsersService implements CrudRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mailService: MailService
  ) {}

  async findValid(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.findValid(id);
    return new ResponseUserDto(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<Array<ResponseUserDto>> {
    const data = await this.usersRepository.find({
      where: {
        deleted: false,
      },
    });

    return data.map((item) => new ResponseUserDto(item));
  }

  async insert(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ): Promise<ResponseUserDto> {
    const UserEmail = await this.findOneByEmail(email);

    if (UserEmail) {
      if (UserEmail.deleted) {
        throw new BadRequestException(
          'El usuario con este e-mail fue previamente eliminado.'
        );
        //
      }

      throw new BadRequestException('E-mail en uso');
    }

    if (!Object.values(Roles).includes(role as Roles)) {
      throw new BadRequestException('Rol no definido');
    }

    const user = this.usersRepository.create({
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
      role,
    });

    const _userRes = await this.usersRepository.save(user);

    await this.mailService.sendWelcome(
      email,
      '' + firstName + ' ' + lastName,
      password,
      role
    );

    return new ResponseUserDto(_userRes);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<ResponseUserDto> {
    const emailCheck = await this.findOneByEmail(updateUserDto.email);
    const entity = await this.findValid(id);

    if (emailCheck.id !== entity.id)
      throw new BadRequestException('Email en uso');

    if (updateUserDto?.firstName) {
      entity.firstName = updateUserDto?.firstName;
    }

    if (updateUserDto?.lastName) {
      entity.lastName = updateUserDto?.lastName;
    }

    if (updateUserDto?.email) {
      entity.email = updateUserDto?.email;
    }
    if (updateUserDto?.status !== undefined || updateUserDto.status !== null) {
      entity.status = updateUserDto.status;
    }
    if (updateUserDto?.role) {
      entity.role = updateUserDto?.role;
    }

    return new ResponseUserDto(await this.usersRepository.save(entity));
  }

  async updateNameAndEmail(
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ): Promise<ResponseUserDto> {
    const entity = await this.findValid(id);

    if (firstName) {
      entity.firstName = firstName;
    }

    if (lastName) {
      entity.lastName = lastName;
    }

    if (email) {
      entity.email = email;
    }

    return new ResponseUserDto(await this.usersRepository.save(entity));
  }

  async changePassword(
    email: string,
    id: number,
    newPassword: string
  ): Promise<boolean> {
    if (!newPassword) {
      throw new BadRequestException('Contraseña no provista');
    }

    const _response = await this.findOneByEmail(email);
    if (!_response) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }

    if (_response.email != email || _response.id != id) {
      // Ya que no coinciden estos dos valores basicos, algo estuvo mal.
      throw new BadRequestException('Email e ID no coinciden');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _oldPassword, ...response } = _response;

    await this.usersRepository.save({
      password: await hashPassword(newPassword),
      ...response,
    });

    return true;
  }

  async remove(id: number): Promise<ResponseUserDto> {
    const user = await this.findValid(id);
    user.deleted = true;
    return new ResponseUserDto(await this.usersRepository.save(user));
  }

  async findUsersPatients(): Promise<ResponseUserPatientDto[]> {
    const data = await this.usersRepository.find({
      where: {
        deleted: false,
      },
    });
    return data.map((item) => new ResponseUserPatientDto(item));
  }

  async findAllByDoctorRole(): Promise<Array<ResponseUserPatientDto>> {
    const data = await this.usersRepository.find({
      where: {
        deleted: false,
        role: 'doctor' || 'administrador',
      },
    });

    return data.map((item) => new ResponseUserPatientDto(item));
  }

  async findAllByAssistantRole(): Promise<Array<ResponseUserPatientDto>> {
    const data = await this.usersRepository.find({
      where: {
        deleted: false,
        role: 'asistente',
      },
    });

    return data.map((item) => new ResponseUserPatientDto(item));
  }
}
