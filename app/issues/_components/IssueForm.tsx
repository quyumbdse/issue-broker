'use client';

import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { issueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import {Spinner} from "@/app/components";
import SimpleMDE from "react-simplemde-editor";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: {issue?: Issue}) => {

    const router = useRouter()
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid } } =
        useForm<IssueFormData>({
            resolver: zodResolver(issueSchema)
        });
    
    const submitNewIssue = handleSubmit(async (data) => {
        
        try {
            setSubmitting(true);
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data);
            else 
              await axios.post('/api/issues', data);
            router.push('/issues/list');
            router.refresh();
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
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) =>
                        <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={!isValid || isSubmitting} >
                    {issue ? 'Update Issue' : ' Submit New Issue'} {' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm