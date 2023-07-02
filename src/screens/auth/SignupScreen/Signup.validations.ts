import { z } from 'zod';

const signupErrorMessages = {
  'name:required': 'Please enter your name',

  'email:required': 'Please enter your email',
  'email:invalid': 'Enter a valid email',

  'password:min': 'Password must be at least 8 characters',
  'password:max': 'Password cannot exceed 20 characters',
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
      .max(20, { message: signupErrorMessages['password:max'] }),
    confirmPassword: z
      .string()
      .min(8, { message: signupErrorMessages['password:min'] })
      .max(20, { message: signupErrorMessages['password:max'] }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type SignupFormValues = z.infer<typeof signupValidationSchema>;
