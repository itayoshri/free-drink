import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/invitation/invitation.entity';

export const Roles = Reflector.createDecorator<UserRole[]>();
