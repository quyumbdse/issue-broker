
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from './UserCard'
import { getServerSession } from 'next-auth'
import authOptions from '../auth/authOptions'

export default async function AdminPage() {
   
    // const session = await getServerSession(authOptions);

    // console.log(session?.user)
    // if (!session) {
    //     redirect('/api/auth/signin?callbackUrl=/admin')
    // }

    return (
        <div>
           <p>Admin Page</p>
        </div>
    )
}