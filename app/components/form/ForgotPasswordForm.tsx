'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { resetPassword } from '@/app/(auth)/forgot-password/_action';
import { useState } from 'react';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });
  const [error, setError] = useState('')
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
       await resetPassword(values)
    } catch (error) {
      setError('An un expected error occured');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full '>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
        />
         {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className='w-full mt-6' type='submit'>
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
