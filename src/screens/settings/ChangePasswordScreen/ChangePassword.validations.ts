import { z } from 'zod';

import { AtLeastOneLowercaseLetter, AtLeastOneSpecialCharacter, AtLeastOneUppercaseLetter } from '@jl/constants';

const changePasswordErrorMessages = {
  'currentPassword:required': 'Please enter your current Password',

  'password:min': 'Password must be at least 8 characters',
  'password:max': 'Password cannot exceed 20 characters',

  'password:lowercaseLetter': 'Password must have at least one lowercase letter',
  'password:uppercaseLetter': 'Password must have at least one uppercase letter',
  'password:specialCharacter': 'Password must have at least one special character',
};

export const changePasswordValidationSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: changePasswordErrorMessages['password:min'] })
    .max(20, { message: changePasswordErrorMessages['password:max'] })
    .regex(AtLeastOneLowercaseLetter, { message: changePasswordErrorMessages['password:lowercaseLetter'] })
    .regex(AtLeastOneUppercaseLetter, { message: changePasswordErrorMessages['password:uppercaseLetter'] })
    .regex(AtLeastOneSpecialCharacter, { message: changePasswordErrorMessages['password:specialCharacter'] }),

  newPassword: z
    .string()
    .min(8, { message: changePasswordErrorMessages['password:min'] })
    .max(20, { message: changePasswordErrorMessages['password:max'] })
    .regex(AtLeastOneLowercaseLetter, { message: changePasswordErrorMessages['password:lowercaseLetter'] })
    .regex(AtLeastOneUppercaseLetter, { message: changePasswordErrorMessages['password:uppercaseLetter'] })
    .regex(AtLeastOneSpecialCharacter, { message: changePasswordErrorMessages['password:specialCharacter'] }),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordValidationSchema>;
