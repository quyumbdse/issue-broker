
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import prisma from '@/prisma/client';
import React from 'react'
import {IssueStatusBadge, Link} from '@/app/components';
import IssueActions from './IssueActions';

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();

  return (
    <div className='space-y-5'>
      <div>
         <IssueActions/>
      </div>
    
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Dated</TableColumnHeaderCell>
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
    </div>
  )
}
export const dynamic = 'force-dynamic';

export default IssuesPage