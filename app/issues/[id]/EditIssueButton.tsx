import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/(auth)/authOptions";
import { Issue } from "@prisma/client";

const EditIssueButton = async ({ issueId, issue }: { issueId: number, issue: Issue }) => {
  const session = await getServerSession(authOptions);
    return (
      <Button color='grass'>
        <Link href={`/issues/edit/${issueId}`}>{session?.user.id === issue.assignedToUserId ? 'Issue Done' : 'Edit Issue'} </Link>
      </Button>
    )
};

export default EditIssueButton