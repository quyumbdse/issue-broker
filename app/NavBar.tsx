'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiLongAntennaeBug } from "react-icons/gi";
import classnames from 'classnames';


const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ];
    
    return (
        <nav className="flex space-x-8 border-b h-16 items-center mb-6 px-6">
            <Link className="text-2xl text-teal-800 hover:text-teal-700 transition-colors" href='/'><GiLongAntennaeBug /></Link>
            <ul className="flex space-x-8">
                {links.map(link => (
                    <li key={link.href}>
                        <Link className={classnames({
                            'text-teal-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-teal-600 transition-colors': true,
                            'text-lg' : true,
                        })} 
                        href={link.href}>{link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default NavBar