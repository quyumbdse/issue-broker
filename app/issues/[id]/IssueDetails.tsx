import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex, Text, Heading, Card } from '@radix-ui/themes'
import ReactMarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
    
    return (
    
        <div className='space-y-4'>
            <Heading>{issue.title}</Heading>
            <Flex gap='4'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
    );
};

export default IssueDetails