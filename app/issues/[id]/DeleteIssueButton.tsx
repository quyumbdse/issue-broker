'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
     <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete Issue</Button>
      </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 500 }}>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
              Are you sure? This application will no longer be accessible and any
              existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={ async () => {
              await axios.delete('/api/issues/' + issueId);
              router.push('/issues/list');
              router.refresh();
              }}>Revoke access</Button>
            </AlertDialog.Action>
          </Flex>
         </AlertDialog.Content>
     </AlertDialog.Root>
  )
};

export default DeleteIssueButton