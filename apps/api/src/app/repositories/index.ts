import { Assistant } from './assistant/entities';
import { Availability } from './availability/entities';
import { Cite } from './cite/entities';
import { Doctor } from './doctor/entities';
import { Patient } from './patient/entities';
import { Record } from './record/entities';
import { Settings } from './settings/entities';
import { Speciality } from './speciality/entities';
import { User } from './users/entities';

const entities = [
  User,
  Assistant,
  Availability,
  Cite,
  Doctor,
  Patient,
  Record,
  Settings,
  Speciality,
];
export {
  User,
  Assistant,
  Availability,
  Cite,
  Doctor,
  Patient,
  Record,
  Settings,
  Speciality,
};
export default entities;
