import { z } from 'zod';

import { AtLeastOneLowercaseLetter, AtLeastOneSpecialCharacter, AtLeastOneUppercaseLetter } from '@jl/constants';

const signupErrorMessages = {
  'name:required': 'Please enter your name',

  'email:required': 'Please enter your email',
  'email:invalid': 'Enter a valid email',

  'password:min': 'Password must be at least 8 characters',
  'password:max': 'Password cannot exceed 20 characters',

  'password:lowercaseLetter': 'Password must have at least one lowercase letter',
  'password:uppercaseLetter': 'Password must have at least one uppercase letter',
  'password:specialCharacter': 'Password must have at least one special character',
};

export const signupValidationSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .min(1, { message: signupErrorMessages['email:required'] })
      .email({ message: signupErrorMessages['email:invalid'] }),
    password: z
      .string()
      .min(8, { message: signupErrorMessages['password:min'] })
      .max(20, { message: signupErrorMessages['password:max'] })
      .regex(AtLeastOneLowercaseLetter, { message: signupErrorMessages['password:lowercaseLetter'] })
      .regex(AtLeastOneUppercaseLetter, { message: signupErrorMessages['password:uppercaseLetter'] })
      .regex(AtLeastOneSpecialCharacter, { message: signupErrorMessages['password:specialCharacter'] }),
    confirmPassword: z
      .string()
      .min(8, { message: signupErrorMessages['password:min'] })
      .max(20, { message: signupErrorMessages['password:max'] })
      .regex(AtLeastOneLowercaseLetter, { message: signupErrorMessages['password:lowercaseLetter'] })
      .regex(AtLeastOneUppercaseLetter, { message: signupErrorMessages['password:uppercaseLetter'] })
      .regex(AtLeastOneSpecialCharacter, { message: signupErrorMessages['password:specialCharacter'] }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type SignupFormValues = z.infer<typeof signupValidationSchema>;
