import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Unique,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity('users')
@Unique('unique-email', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  role: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8);
  }

  @Column()
  password: string;
}

// checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
//     return await bcrypt.compare(unencryptedPassword, this.password);
// }
