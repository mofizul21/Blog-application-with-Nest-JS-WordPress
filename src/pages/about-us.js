import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { allCategory } from "../../lib/posts";
import { useState } from "react";

export async function getStaticProps() {
    const allCategories = await allCategory();

    return {
        props: {
            allCategories,
        }
    }
}

const allCategories = await allCategory();

export default function Post({ allCategories }) {
    const [categories, setCategories] = useState(allCategories);

    return (
        <>
            <Head>
                <title key="pagetitle">About Us - Post Verses Blog</title>
                <meta name="description" content="technology" key="meta-description" />
            </Head>

            <Header categories={categories} />

            <div className="container my-24 mx-auto md:px-6">
                <section className="mb-32">
                    <div className="mx-auto max-w-[700px] md:px-3">
                        <h2 className="mb-12 text-5xl font-bold text-center">About Us</h2>
                        
                        <p>Welcome to Post Verses, your ultimate destination for in-depth insights and comprehensive resources on React.js, Next.js, JavaScript, GraphQL, and WordPress. We are passionate about empowering developers, designers, and enthusiasts with the knowledge they need to excel in the dynamic world of web development and content management.</p>

                        <p>Our mission is to provide a platform where you can explore the latest trends, best practices, and innovative techniques in the realm of web technologies. Whether you're a seasoned professional looking to stay up-to-date or a beginner eager to learn the ropes, our carefully curated articles, tutorials, and guides are designed to cater to your needs.</p>

                        <h3 className="text-3xl font-bold mb-3">Why Choose Post Verses?</h3>

                        <p><span className="text-1xl font-bold">1.Expertise:</span> Our team of experienced developers and writers is dedicated to delivering high-quality, accurate, and up-to-date content. We understand the importance of reliable information in the ever-evolving tech landscape.</p>

                        <p><span className="text-1xl font-bold">2. Diverse Topics:</span> From the intricacies of React.js and Next.js to the versatility of JavaScript, the power of GraphQL, and the versatility of WordPress, we cover a wide range of topics to ensure you have a comprehensive understanding of modern web development.</p>

                        <p><span className="text-1xl font-bold">3. Community:</span> We believe in the strength of a supportive community. Post Verses is not just a website; it's a platform where like-minded individuals can share their experiences, ask questions, and learn from one another. Join us in our mission to foster collaboration and knowledge exchange.</p>

                        <p><span className="text-1xl font-bold">4. Practical Resources:</span> Our tutorials are designed with practicality in mind. We provide step-by-step guides, real-world examples, and actionable tips that you can immediately apply to your projects.</p>

                        <p><span className="text-1xl font-bold">5. Continuous Learning:</span> Technology never stands still, and neither do we. We're committed to staying ahead of the curve, which means you can expect regular updates on the latest tools, techniques, and trends.</p>

                        <p>Thank you for choosing Post Verses as your go-to source for all things React.js, Next.js, JavaScript, GraphQL, and WordPress. We're excited to embark on this journey of exploration and growth with you. If you have any questions, suggestions, or topics you'd like us to cover, please don't hesitate to reach out. Together, we'll build a stronger, more vibrant web development community. Happy coding!</p>

                        <p>Stay curious, stay inspired, and keep on learning!</p>

                        <p>The Post Verses Team</p>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}