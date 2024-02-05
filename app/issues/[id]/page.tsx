import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({ params }: Props) => {
    
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!issue)
        return notFound();

  return (
      <div className="space-y-3">
          <Heading>{issue.title}</Heading>
          <Flex gap='3'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose'>
              <ReactMarkDown>{issue.description}</ReactMarkDown>
          </Card> 
      </div>
  )
}

export default IssueDetailPage