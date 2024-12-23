import { UserValidationRules } from '../../../common/resources/users';

export interface CreateUserDto {
    username: string;
    password: string;
}

export const registerSchema = {
  tags: ['Account'],
  summary: 'Register a new user',
  description: `<h3> This API let new users to register </h3>`,
  body: {
    title: 'Register new user',
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        minLength: UserValidationRules.usernameMinLength,
        maxLength: UserValidationRules.usernameMaxLength,
      },
      password: {
        type: 'string',
        minLength: UserValidationRules.passwordMinLength,
        maxLength: UserValidationRules.passwordMaxLength,
      },
    },
  },
};
