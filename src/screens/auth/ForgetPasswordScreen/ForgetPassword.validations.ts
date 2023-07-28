import { z } from 'zod';

const forgetPasswordErrorMessages = {
  'email:required': 'Please enter your email',
  'email:invalid': 'Enter a valid email',
};

export const ForgetPasswordValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: forgetPasswordErrorMessages['email:required'] })
    .email({ message: forgetPasswordErrorMessages['email:invalid'] }),
});

export type ForgetPasswordFormValues = z.infer<typeof ForgetPasswordValidationSchema>;
