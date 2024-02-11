'use client';

import { Box, Button, Callout, Grid, Select, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { patchIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components";
import SimpleMDE from "react-simplemde-editor";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof patchIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const statases = [
        { label: 'OPEN', value: 'OPEN' },
        { label: 'IN_PROGRESS', value: 'IN_PROGRESS' },
        { label: 'CLOSED', value: 'CLOSED' }
    ]
    const router = useRouter()
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid } } =
        useForm<IssueFormData>({
            resolver: zodResolver(patchIssueSchema)
        });

    const submitNewIssue = handleSubmit(async (data) => {

        try {
            setSubmitting(true);
            if (issue)
                await axios.patch('/api/issues/' + issue.id, {status: 'CLOSED', data});
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
        <>
            {error && <Callout.Root color="red">
                <Callout.Text >
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form onSubmit={submitNewIssue}>
                <Grid columns={{ initial: '1', sm: '4' }} gap='6'>
                    <Box className="md:col-span-3 space-y-5">
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
                    </Box>
                </Grid>
            </form>
        </>
    );
};

export default IssueForm