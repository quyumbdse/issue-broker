'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiLongAntennaeBug } from "react-icons/gi";
import classnames from 'classnames';
import { Avatar, Text, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Skeleton } from "./components";
import { IoPersonCircleOutline } from "react-icons/io5";


const NavBar = () => {

    return (
    
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'>
                            <GiLongAntennaeBug/>
                        </Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container> 
        </nav>
    )
};

const NavLinks = () => {
    const { data: session } = useSession();
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' },
        // { label: 'Admin', href: '/admin' }
    ];

    return (
        <>
        <ul className="flex space-x-6">
                {links.map(link => (
                <li key={link.href}>
                    <Link className={classnames({
                        'nav-link' : true,
                        '!text-teal-900': link.href === currentPath,
                    })}
                        href={link.href}>{link.label}
                    </Link>
                </li>
            ))}
                {session && session?.user.role !== 'USER' && <li><Link href='/admin'>Admin</Link></li>}
            </ul>
        </>
    )
};

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return <Skeleton width='3rem'/>
    
    if (status === 'unauthenticated')
        return <Link className="nav-link" href='/sign-in'>Login</Link>
    
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                   <Text>
                    <Avatar
                            src={session!.user!.image}
                            fallback=<IoPersonCircleOutline/>
                            size='2'
                            radius="full"
                            className="cursor-pointer"
                            referrerPolicy="no-referrer" />
                    </Text>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        {session!.user?.email}
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>             
        </Box>
    );
};

export default NavBar