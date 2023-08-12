import Link from "next/link";

export default function Footer(){
    return(
        <footer className="w-full border-t bg-white pb-12">
            <div className="w-full container mx-auto flex flex-col items-center">
                <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
                    <Link href="/about" className="uppercase px-3 text-black">About Us</Link>
                    <Link href="#" className="uppercase px-3 text-black">Privacy Policy</Link>
                    <Link href="#" className="uppercase px-3 text-black">Terms & Conditions</Link>
                    <Link href="/contact-us" className="uppercase px-3 text-black">Contact Us</Link>
                </div>
                <div className="uppercase pb-6 text-black">&copy; Post Verses 2023</div>
            </div>
        </footer>
    )
}