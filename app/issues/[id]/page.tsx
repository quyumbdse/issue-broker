import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({ params }: Props) => {
    
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue)
        return notFound();

    return (
        <Grid columns={{initial: '1', md: '2'}} gap='4'>
            <Box className="space-y-4">
                <Heading>{issue.title}</Heading>
                <Flex gap='4'>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose'>
                    <ReactMarkDown>{issue.description}</ReactMarkDown>
                </Card>
            </Box>
            <Box>
                <Button>Edit Issue<Pencil2Icon/></Button>
            </Box>
        </Grid>
    )
};

export default IssueDetailPage