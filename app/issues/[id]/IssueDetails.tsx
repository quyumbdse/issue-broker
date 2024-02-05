import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex, Text, Heading, Card } from '@radix-ui/themes'
import ReactMarkDown from "react-markdown";

const IssueDetails = ({issue}: {issue: Issue}) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='4'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </>
    );
};

export default IssueDetails