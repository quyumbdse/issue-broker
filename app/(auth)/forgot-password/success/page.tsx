import { Button, Card, Flex } from '@radix-ui/themes'
import Link from 'next/link'

export default async function SuccessPage() {
  return (
    <main className="">
      <Card className="gap-4 flex flex-col">
        <Flex gap="4" direction="column">
          <h1 className="text-2xl font-light">Password reset</h1>
          <p>If the email `&doesn`;t show up, check your spam folder.</p>
          <Button type="submit" asChild>
            <Link href="/sign-in">Return to Login</Link>
          </Button>
        </Flex>
      </Card>
    </main>
  )
}