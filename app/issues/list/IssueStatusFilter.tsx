'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'


const statases: { id: number, label: string, value?: Status }[] = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Open', value: 'OPEN' },
    { id: 3, label: 'In Progress', value: 'IN_PROGRESS' },
    { id: 4, label: 'Closed', value: 'CLOSED' }
];

const IssueStatusFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

  return (
      <Select.Root
          defaultValue={searchParams.get('status') || ''}
          onValueChange={(status) => {
        
          const params = new URLSearchParams();
          if (status) params.append('status', status);
          if (searchParams.get('orderBy'))
              params.append('orderBy', searchParams.get('orderBy')!);
          const query = params.size ? '?' + params.toString() : '';
          router.push(`/issues/list${query}`);
      }}>
        <Select.Trigger/>
        <Select.Content>
              {statases.map(status => (
                  <Select.Item key={status.id}
                      value={status.value || ''}>{status.label}
                  </Select.Item>))} 
        </Select.Content>  
    </Select.Root>
  )
}

export default IssueStatusFilter