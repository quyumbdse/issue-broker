import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Link href={`/issues/${issueId}/edit`}>
                Edit Issue<Pencil2Icon />
            </Link>
        </Button>
    )
};

export default EditIssueButton