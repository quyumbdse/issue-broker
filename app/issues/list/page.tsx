
import { Flex } from '@radix-ui/themes'
import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';

interface Props {
  searchParams: IssueQuery 
};

const IssuesPage = async ({ searchParams }: Props) => {
  
  const statases = Object.values(Status);
  const status = statases.includes(searchParams.status)
    ? searchParams.status
    : undefined
  const where = { status };

  const orderBy = columnNames
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

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      {issues.length > 0 &&
        <IssueTable searchParams={searchParams} issues={issues} />
      }
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount} />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage