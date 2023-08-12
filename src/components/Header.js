import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUsers } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header({ categories }) {

    return (
        <>
            <nav className="w-full py-4 bg-blue-800 shadow">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between">

                    <nav>
                        <ul className="flex items-center justify-between font-bold text-white uppercase no-underline text-lg">
                            <li>
                                <Link className="pl-6 font-bold uppercase" href="/about-us">
                                    <FontAwesomeIcon
                                        icon={faUsers}
                                        style={{ fontSize: 20, color: "#fff", marginRight: '5px' }}
                                    /> 
                                About Us</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center text-lg no-underline text-white pr-6">                      
                        <Link className="pl-6 font-bold uppercase" href="/contact">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                style={{ fontSize: 20, color: "#fff", marginRight: '5px' }}
                            /> 
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <Link className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="/">
                        Post Verses
                    </Link>
                    <p className="text-lg text-gray-600">
                        The Postmodern Saga
                    </p>
                </div>
            </header>


            <nav className="w-full py-4 border-t border-b bg-gray-100">

                <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                    {categories.nodes.slice(0, 6).map((category) => (
                        <Link key={category.id} href={`/category/${category.slug}`} className="hover:bg-gray-400 rounded py-2 px-4 mx-2 text-black">{category.name}</Link>
                    ))}
                </div>

            </nav >
        </>
    )
}