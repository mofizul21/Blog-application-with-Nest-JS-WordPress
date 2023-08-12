import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5 text-black">About Us</p>
                <p className="pb-2 text-black">Post Verses: Your go-to source for insightful articles on Next.js, React.js, and JavaScript. We're passionate about sharing knowledge, helping you master web development, and stay ahead in the tech world.</p>
                <Link href="/about-us" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                    Get to know us
                </Link>
            </div>

            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                <p className="text-xl font-semibold pb-5 text-black">Instagram</p>
                <div className="grid grid-cols-3 gap-3">

                    <Image
                        src="https://images.unsplash.com/photo-1682687982185-531d09ec56fc"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1682685797507-d44d838b0ac7"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1661956602153-23384936a1d3"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1690609998976-929dca8ba3de"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1682685797898-6d7587974771"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1690945192649-5027876956bb"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1682686580849-3e7f67df4015"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1661956600684-97d3a4320e45"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1682687220208-22d7a2543e88"
                        alt="Instagram"
                        width="150"
                        height="150"
                    />

                </div>
                <Link href="https://facebook.com/mofizul21" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                    <i className="fab fa-instagram mr-2"></i> Follow @dgrzyb
                </Link>
            </div>

        </aside>
    )
}