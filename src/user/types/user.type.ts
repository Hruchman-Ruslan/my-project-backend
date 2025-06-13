import { UserEntity } from '../user.entity';

export type UserType = Pick<UserEntity, 'id' | 'username' | 'email' | 'avatar'>;
