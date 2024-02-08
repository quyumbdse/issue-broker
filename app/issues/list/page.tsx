
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import prisma from '@/prisma/client';
import NextLink from 'next/link';
import {IssueStatusBadge, Link} from '@/app/components';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    page: string
    sort: 'asc' | 'desc'
  }
}

const IssuesPage = async ({ searchParams }: Props) => {
  
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ]

  const statases = Object.values(Status);
  const status = statases.includes(searchParams.status)
    ? searchParams.status
    : undefined
  const where = { status };
  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sort }
    : undefined;
  
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where});

  return (
    <div className='space-y-5'>
      <div>
        <IssueActions />
      </div>
    
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <TableColumnHeaderCell key={column.value} className={column.className}>
                {column.label}
                <NextLink href={{
                            query: { ...searchParams, orderBy: column.value, sort: 'asc' }
                        }}><ArrowUpIcon className='inline nav-link' /></NextLink>

                        <NextLink href={{
                            query: { ...searchParams, orderBy: column.value, sort: 'desc' }
                }}><ArrowDownIcon className='inline nav-link' />
                </NextLink>
               
                {/* <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>} */}
              </TableColumnHeaderCell>))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {issues.map(issue => <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{ issue.createdAt.toDateString() }</Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}/>
    </div>
  )
}

export const dynamic = 'force-dynamic';

export default IssuesPage