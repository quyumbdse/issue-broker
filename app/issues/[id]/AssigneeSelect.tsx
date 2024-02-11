'use client'
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const router = useRouter();
   
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) return <Skeleton />

    if (error) return null;

    const assigneSelect = (userId: string) => {
        if (issue.assignedToUserId === null && issue.status !== 'CLOSED')
            
            axios.patch('/api/issues/' + issue.id,
               
                {
                    assignedToUserId: userId || null,
                }).catch(() => {
                    toast.error('Changes Could not saved.')
                })
                .then(() => {
                    axios.patch('/api/issues/' + issue.id,
                        { status: 'IN_PROGRESS' });
                    router.push('/issues/list');
                    router.refresh();
                });


    };

    return (
        <>
            {issue.assignedToUserId && <Select.Root
                defaultValue={issue.assignedToUserId}
                onValueChange={assigneSelect}>
                
                <Select.Trigger />
                <Select.Content>
                        {users?.map(user =>
                            <Select.Item key={user.id}
                                value={user.id}>{user.name}</Select.Item>)}
                </Select.Content>
            </Select.Root>}

            {!issue.assignedToUserId && <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={assigneSelect}>
                
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestion</Select.Label>
                        <Select.Item value="">Unassigned</Select.Item>
                        {users?.map(user =>
                            <Select.Item key={user.id}
                                value={user.id}>{user.name}</Select.Item>)}
                    </Select.Group>
                </Select.Content>
            </Select.Root>}
            <Toaster />
        </>
    )
};

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 30000,
    retry: 3
});

export default AssigneeSelect