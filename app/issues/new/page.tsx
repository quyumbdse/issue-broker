'use client';

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter()
    const [error, setError] = useState('');

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid } } =
        useForm<IssueForm>({
            resolver: zodResolver(createIssueSchema)
        });
    
    return (
        <div className="max-w-xl space-y-4">
           {error && <Callout.Root color="red">
                <Callout.Text >
                    {error}
                </Callout.Text>
             </Callout.Root>}
           
            <form className="max-w-xl space-y-4"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setError('An un expected error occured');
                    }
                    
                })}>
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
                <Button disabled={!isValid}>
                    Submit New Issue
                </Button>
            </form>
        </div>
    )
};

export default NewIssuePage