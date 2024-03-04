'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { resetPassword } from '@/app/(auth)/password-reset/[token]/_actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/app/components';

const FormSchema = z.object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const ResetPasswordForm = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        password: '',
        confirmPassword: ''
    },
  });

  async function submit(values: z.infer<typeof FormSchema>) {
    try {
      setSubmitting(true);
      const res = await resetPassword(params.token, values);
      if (res?.error) {
        setError(res?.error);
        setSubmitting(false);
      } else {
        router.push('/password-reset/success');
      }
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='w-full space-y-5'>
        <strong>Reset your Password</strong>
        <div className='space-y-2'>
           <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button disabled={ isSubmitting} className='w-full mt-6' type='submit'>
         {' Reset Password '} {' '} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;

