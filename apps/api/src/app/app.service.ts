import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import entities, {
  User,
  Speciality,
  Doctor,
  Availability,
  Assistant,
  Patient,
  Cite,
  Record,
} from './repositories';

import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  doctors = [];
  users = [];
  specialities = [];
  availabilities = [];
  patients = [];
  assistants = [];
  cites = [];
  records = [];

  private dataSource!: DataSource;

  constructor(
    private configService: ConfigService,
  ) {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: entities,
    })
  }
  async init(): Promise<void> {
    await this.dataSource.initialize();
    await this.dataSource.transaction(async (entityManager) => {
      this.first_generate()

      this.users = await entityManager.save(User, this.users);
      this.specialities = await entityManager.save(Speciality, this.specialities);
      console.log(this.users)
      console.log('************************')
      console.log(this.specialities)

      this.second_generate()

      this.doctors = await entityManager.save(Doctor, this.doctors);
      this.patients = await entityManager.save(Patient, this.patients);
      console.log(this.doctors)
      console.log('************************')
      console.log(this.patients)

      this.third_generate();

      this.availabilities = await entityManager.save(Availability, this.availabilities);
      this.assistants = await entityManager.save(Assistant, this.assistants);
      console.log(this.availabilities)
      console.log('************************')
      console.log(this.assistants)

      this.fourth_generate();

      this.cites = await entityManager.save(Cite, this.cites);
      this.records = await entityManager.save(Record, this.records);
      console.log(this.cites)
      console.log('************************');
      console.log(this.records)

    })
  }

  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  fourth_generate() {

    this.cites = [
      { subject: 'Consulta general', date: '15/07/2023', patientConfirm: true, doctor: this.doctors[0], patient: this.patients[0], time: this.availabilities[0] },
      { subject: 'Control de rutina', date: '20/07/2023', patientConfirm: true, doctor: this.doctors[1], patient: this.patients[1], time: this.availabilities[4] },
      { subject: 'Consulta pediátrica', date: '25/07/2023', patientConfirm: true, doctor: this.doctors[2], patient: this.patients[2], time: this.availabilities[7] },
    ];

    this.records = [
      { description: 'Infección respiratoria', date: '2023-07-01', doctor: this.doctors[0], patient: this.patients[0] },
      { description: 'Fractura de brazo', date: '2023-07-05', doctor: this.doctors[1], patient: this.patients[1] },
      { description: 'Gripe', date: '2023-07-08', doctor: this.doctors[2], patient: this.patients[2] },
    ];
  }

  first_generate() {
    this.users = [
      { firstName: 'Juan', lastName: 'García', email: 'juan.garcia@example.com', role: 'paciente', password: '123456789' },
      { firstName: 'María', lastName: 'Martínez', email: 'maria.martinez@example.com', role: 'paciente', password: '123456789' },
      { firstName: 'Pedro', lastName: 'Sánchez', email: 'pedro.sanchez@example.com', role: 'paciente', password: '123456789' },
      { firstName: 'Laura', lastName: 'González', email: 'laura.gonzalez@example.com', role: 'asistente', password: '123456789' },
      { firstName: 'Ana', lastName: 'Hernández', email: 'ana.hernandez@example.com', role: 'asistente', password: '123456789' },
      { firstName: 'Alberto', lastName: 'Jiménez', email: 'alberto.jimenez@example.com', role: 'asistente', password: '123456789' },
      { firstName: 'Miguel', lastName: 'López', email: 'miguel.lopez@example.com', role: 'doctor', password: '123456789' },
      { firstName: 'Carmen', lastName: 'Muñoz', email: 'carmen.munoz@example.com', role: 'doctor', password: '123456789' },
      { firstName: 'José', lastName: 'Gutiérrez', email: 'jose.gutierrez@example.com', role: 'doctor', password: '123456789' },
    ]
    this.specialities = [
      { name: 'Cardiología', description: 'Especialidad médica que se ocupa del diagnóstico y tratamiento de las enfermedades del corazón y del aparato circulatorio.' },
      { name: 'Oncología', description: 'Especialidad médica que se ocupa del diagnóstico y tratamiento de las enfermedades oncológicas, es decir, del cáncer.' },
      { name: 'Neurología', description: 'Especialidad médica que se ocupa del diagnóstico y tratamiento de las enfermedades del sistema nervioso central y periférico.' },
    ]
  }

  second_generate() {
    this.doctors = [
      { phone: '555-5678', speciality: this.specialities[0], user: this.users[6] },
      { phone: '555-9012', speciality: this.specialities[2], user: this.users[7] },
      { phone: '555-2548', speciality: this.specialities[1], user: this.users[8] },

    ];
    this.patients = [
      { phone: '555-1234', address: '123 Main St', user: this.users[0] },
      { phone: '555-5678', address: '456 Oak Ave', user: this.users[1] },
      { phone: '555-9012', address: '789 Elm St', user: this.users[2] },
    ];
  }

  third_generate() {
    this.availabilities = [
      { start: '09:00 AM', end: '01:00 PM', day: 'Lunes', available: true, doctor: this.doctors[0] },
      { start: '02:00 PM', end: '06:00 PM', day: 'Martes', available: true, doctor: this.doctors[0] },
      { start: '10:00 AM', end: '02:00 PM', day: 'Miércoles', available: true, doctor: this.doctors[0] },
      { start: '09:00 AM', end: '01:00 PM', day: 'Lunes', available: true, doctor: this.doctors[0] },
      { start: '02:00 PM', end: '06:00 PM', day: 'Martes', available: true, doctor: this.doctors[1] },
      { start: '10:00 AM', end: '02:00 PM', day: 'Miércoles', available: true, doctor: this.doctors[1] },
      { start: '08:00 AM', end: '12:00 PM', day: 'Jueves', available: true, doctor: this.doctors[1] },
      { start: '01:00 PM', end: '05:00 PM', day: 'Viernes', available: true, doctor: this.doctors[1] },
      { start: '11:00 AM', end: '03:00 PM', day: 'Sábado', available: true, doctor: this.doctors[2] },
      { start: '08:00 AM', end: '12:00 PM', day: 'Lunes', available: true, doctor: this.doctors[2] },
      { start: '01:00 PM', end: '05:00 PM', day: 'Martes', available: true, doctor: this.doctors[2] },
      { start: '11:00 AM', end: '03:00 PM', day: 'Miércoles', available: true, doctor: this.doctors[2] }
    ];
    this.assistants = [
      { doctor: this.doctors[0], user: this.users[3] },
      { doctor: this.doctors[1], user: this.users[4] },
      { doctor: this.doctors[2], user: this.users[5] },]


  }


  async remove() {
    await this.dataSource.initialize();
    await this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(Cite, {});
      await entityManager.delete(Record, {});
      //
      await entityManager.delete(Assistant, {});
      await entityManager.delete(Availability, {});
      //
      await entityManager.delete(Doctor, {});
      await entityManager.delete(Patient, {});
      //
      await entityManager.delete(Speciality, {});
      await entityManager.delete(User, { password: '123456789' }
      );

    })
  }
}



