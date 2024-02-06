'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiLongAntennaeBug } from "react-icons/gi";
import classnames from 'classnames';
import { Box, Container, Flex } from "@radix-ui/themes";


const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ];
    
    return (
    
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link className="text-teal-800 hover:text-teal-700 transition-colors" href='/'><GiLongAntennaeBug /></Link>
                        <ul className="flex space-x-6">
                            {links.map(link => (
                                <li key={link.href}>
                                    <Link className={classnames({
                                        'text-teal-900': link.href === currentPath,
                                        'text-zinc-500': link.href !== currentPath,
                                        'hover:text-teal-600 transition-colors': true,
                                    })}
                                    href={link.href}>{link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                       <Link href=''>Login</Link>
                    </Box>
                </Flex>
            </Container> 
        </nav>
    )
};

export default NavBar