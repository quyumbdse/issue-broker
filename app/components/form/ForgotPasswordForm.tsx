'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { resetPassword } from '@/app/(auth)/forgot-password/_action';
import { useState } from 'react';
import Spinner from '../Spinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const ForgotPasswordForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('')
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setSubmitting(true);
      const res = await resetPassword(values)
      if (res?.error) {
        setError(res?.error);
        setSubmitting(false);
      }
      else{
        router.push('/forgot-password/success');
      }
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your reset email.</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />
         {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button disabled={ isSubmitting} className='w-full mt-6' type='submit'>
         {' Reset Password '} {' '} {isSubmitting && <Spinner/>}
        </Button>
      </form>
       <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t want to reset, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Signin
        </Link>
      </p>
    </Form>
  );
};

export default ForgotPasswordForm;
