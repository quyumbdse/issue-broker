import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import Link from "next/link"
import { IssueStatusBadge } from "./components"
import { IoPersonCircleOutline } from "react-icons/io5";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { assignedToUser: true, createdBy: true },
    })
    return (
        <Card>
            <Heading size='4' mb='5'>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue =>
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Flex gap= '9'>
                                            <Link className="nav-link" href={`/issues/${issue.id}`}>{issue.title}</Link>
                                         <p className="text-zinc-400">{issue.createdBy.name}</p>
                                        </Flex>
                                        <IssueStatusBadge status={issue.status} />
                                       
                                    </Flex>
                                    {issue.assignedToUserId && (
                                        <Avatar
                                        src={issue.assignedToUser!.image!}
                                        fallback=<IoPersonCircleOutline/>
                                        size='2'
                                        radius='full' />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues