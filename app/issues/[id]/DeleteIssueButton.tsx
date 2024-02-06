'use client'
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {         
    try {
      setDeleting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    };
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>Delete Issue{isDeleting && <Spinner/>}</Button>
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
              <Button variant="solid" color="red" onClick={deleteIssue}>Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ maxWidth: 500 }}>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue not be deleted</AlertDialog.Description>
          <Flex mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray"
              onClick={() => setError(false)}>Cancel</Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton