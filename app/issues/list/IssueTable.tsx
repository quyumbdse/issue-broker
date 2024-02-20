import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '@/app/components';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { Table, TableColumnHeaderCell } from '@radix-ui/themes';

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    sort: "asc" | "desc",
    name: string
    page: string,
}

interface Props {
  searchParams: IssueQuery,
    issues: Issue[]
};

const IssueTable = async ({ searchParams, issues }: Props) => {

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column => (
                        <TableColumnHeaderCell key={column.id} className={column.className}>
                            {column.label}
                            <NextLink href={{
                                query: { ...searchParams, orderBy: column.value, sort: 'asc' }
                            }}>{column.label !== 'AssignTo' && <ArrowUpIcon className='inline nav-link' />}
                            </NextLink>
                            <NextLink href={{
                                query: { ...searchParams, orderBy: column.value, sort: 'desc' }
                            }}>{column.label!=='AssignTo' &&<ArrowDownIcon className='inline nav-link' />}
                            </NextLink>
                        </TableColumnHeaderCell>))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue =>
                   <Table.Row key={issue.id}>
                    <Table.Cell>
                        <Link href={`/issues/${issue.id}`}>
                            {issue.title}
                        </Link>
                        <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                    {/* <Table.Cell className='hidden md:table-cell'>{issue.createdBy!.name}</Table.Cell> */}
                </Table.Row>)}
            </Table.Body>
        </Table.Root>
    );
};

 const columns: {id: number, label: string; value?: keyof Issue; className?: string }[] = [
        { id: 1, label: 'Issue', value: 'title' },
        { id: 2, label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { id: 3, label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
        // { id: 4, label: 'AssignTo', value: 'createdBy', className: 'hidden md:table-cell' }
    ];

export const columnNames = columns.map(column => column.value);

export default IssueTable