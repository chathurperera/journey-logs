import { z } from 'zod';

const loginErrorMessages = {
  'email:required': 'Please enter your email',
  'email:invalid': 'Enter a valid email',

  'password:min': 'Password must be at least 8 characters',
  'password:max': 'Password cannot exceed 20 characters',
};

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: loginErrorMessages['email:required'] })
    .email({ message: loginErrorMessages['email:invalid'] }),
  password: z
    .string()
    .min(8, { message: loginErrorMessages['password:min'] })
    .max(20, { message: loginErrorMessages['password:max'] }),
});

export type LoginFormValues = z.infer<typeof loginValidationSchema>;
