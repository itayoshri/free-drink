import { Reflector } from '@nestjs/core';
import { Role } from 'src/invitation/invitation.entity';

export const Roles = Reflector.createDecorator<Role[]>();
