'use client';

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import {Spinner} from "@/app/components";
import dynamic from 'next/dynamic';
import delay from 'delay'

const SimpleMDE = dynamic(() =>
    import('react-simplemde-editor'),
    { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter()
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid } } =
        useForm<IssueForm>({
            resolver: zodResolver(createIssueSchema)
        });
    
    const submitNewIssue = handleSubmit(async (data) => {
        
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An un expected error occured');
        }      
    });
    
    return (
    
        <div className="max-w-xl space-y-4">
           {error && <Callout.Root color="red">
                <Callout.Text >
                    {error}
                </Callout.Text>
             </Callout.Root>}
           
            <form className="max-w-xl space-y-4"
                onSubmit={submitNewIssue}>
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                    <ErrorMessage>
                        {errors.title?.message}
                    </ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({field}) =>
                        <SimpleMDE placeholder="Description" {...field} />} />
                        <ErrorMessage>
                        {errors.description?.message}
                        </ErrorMessage>
                <Button disabled={!isValid || isSubmitting} >
                    Submit New Issue
                    {isSubmitting &&  <Spinner/>}
                </Button>
            </form>
        </div>
    )
};

export default NewIssuePage