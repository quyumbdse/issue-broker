import Link from "next/link";
import { GiLongAntennaeBug } from "react-icons/gi";;

const NavBar = () => {

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ];
    
    return (
        <nav className="flex space-x-8 border-b h-16 items-center mb-6 px-6">
            <Link className="text-2xl text-teal-800 hover:text-teal-700 transition-colors" href='/'><GiLongAntennaeBug /></Link>
            <ul className="flex space-x-8">
                {links.map(link => (
                    <li key={link.href}>
                        <Link className=
                            "text-lg text-zinc-500 hover:text-teal-900 transition-colors" href={link.href}>{link.label}</Link></li>
                ))}
            </ul>
        </nav>
    )
};

export default NavBar