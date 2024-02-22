import prisma from "@/prisma/client";
import { Box, Flex, Grid} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/(auth)/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import { Status, UserRole } from "@prisma/client";

interface Props {
    params: {id: string}
}

const fetchIssue = cache((issueId: number) =>
    prisma.issue.findUnique({ where: { id: issueId }}));
    
const IssueDetailPage = async ({ params }: Props) => {
  
    const session = await getServerSession(authOptions);
    const issue = await fetchIssue(parseInt(params.id));
   
    if (!issue)
        return notFound();
    
    return (
        
        <> 
            < Grid columns={{ initial: '1', sm: '4' }} gap='5'>
            <Box className="md:col-span-3">
                <IssueDetails issue={issue} />
            </Box>
                {
                (session)&& issue.status!==Status.CLOSED && (session.user.id !== issue.assignedToUserId && session.user.role !== UserRole.USER || session.user.id === issue.createdById || session.user.role === UserRole.ADMIN)
                    && 
                    (<Box>
                <Flex direction='column' gap='3'>
                    <AssigneeSelect issue={issue} />
                            <EditIssueButton issueId={issue.id} issue={ issue} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
                    </Box>)}
                {
                   (session) && (session.user.id !== issue.createdById && session.user.role === UserRole.USER && issue.status!==Status.CLOSED) &&
                     (<Box>
                <Flex direction='column' gap='3'>
                    <AssigneeSelect issue={issue} />
                    {session.user.id === issue.assignedToUserId && <EditIssueButton issueId={issue.id} issue={ issue} />}
                </Flex>
                    </Box>)
                }
        </ Grid >
        </>  
    );
};

export async function generateMetadata({params}: Props) {

    const issue = await fetchIssue(parseInt(params.id));

    return {
        title: issue?.title,
        description: 'Details of issue' + issue?.id
    }
};


export default IssueDetailPage