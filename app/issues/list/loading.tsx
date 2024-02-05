import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import CreateNewIssueButton from '../_components/CreateNewIssueButton';
import { Skeleton }from '../../components';

const LoadingIssuePage = () => {

  const issues = [1, 2, 3, 4, 5];
  return (
    <div className='space-y-5'>
      <CreateNewIssueButton />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Dated</TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => <Table.Row key={issue}>
            <Table.Cell>
              <Skeleton />
              <div className='block md:hidden'><Skeleton />
              </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table.Root>
    </div>
  )
};

export default LoadingIssuePage