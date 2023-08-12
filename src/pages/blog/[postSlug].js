import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { allCategory, getPostSlugs, getSinglePost } from "../../../lib/posts";
import { useState } from "react";
import Image from "next/image";
import Date from "@/components/Date";
import Link from "next/link";
import CommentForm from "@/components/CommentForm";
import { getComments } from "../../../lib/comments";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook } from "@fortawesome/free-solid-svg-icons";

export async function getStaticProps({params}) {
    const allCategories = await allCategory();
    const postData = await getSinglePost(params.postSlug);
    const { comments, commentCount } = await getComments(params.postSlug);

    let featuredImageUrl = "https://testwp.envirosonic.com.au/wp-content/uploads/2023/07/munnar-stay.jpg";

    if (postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl) {
        featuredImageUrl = postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl;
    }

    if (!postData) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            allCategories,
            postData,
            featuredImageUrl,
            commentCount,
            comments,
        },
        notFound: false,
    }
}

const allCategories = await allCategory();

export async function getStaticPaths() {
    const postSlugs = await getPostSlugs();

    return {
        paths: postSlugs.map((s) => (
            {
                params: {
                    postSlug: s.slug
                }
            }
        )),
        fallback: 'blocking'
    }
}

export default function Post({ allCategories, postData, featuredImageUrl, commentCount, comments }){
    const [categories, setCategories] = useState(allCategories);
    { console.log('Comment: ', commentCount)}
    
    return (
        <>
        <Head>
            <title key="pagetitle">{`${postData.title} - Post Verses Blog`}</title>
            <meta name="description" content="technology" key="meta-description" />
        </Head>

            <Header categories={categories} />  

            <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full md:w-2/3 flex flex-col items-center px-3">

                    <article className="flex flex-col shadow my-4">

                        <div className="hover:opacity-75">
                            <Image src={featuredImageUrl} width="1200" height="780" alt={postData.title} />
                        </div>

                        <div className="bg-white flex flex-col justify-start p-6">
                            {/* <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Technology</a> */}
                            <h2 className="text-3xl font-bold hover:text-gray-700 pb-4">{postData.title}</h2>
                            <p href="#" className="text-sm pb-8">
                                By <Link href={`/author/${ postData.author.node.slug}`} className="font-semibold hover:text-gray-800">{postData.author.node.name}</Link>, Published on <Date dateString={postData.modified} />
                            </p>
                            
                            <div className="pb-3" dangerouslySetInnerHTML={{ __html: postData.content }} ></div>
                        </div>
                    </article>

                    <div className="w-full flex pt-6">
                        <Link href="/blog/optimizing-wordpress-post-titles-for-performance-in-next-js" className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                            <p className="text-lg text-blue-800 font-bold flex items-center"><i className="fas fa-arrow-left pr-1"></i> Previous</p>
                            <p className="pt-2">Optimizing WordPress Post Titles for Performance in Next.js</p>
                        </Link>
                        <Link href="/blog/next-js-headless-wordpress-setup-displaying-post-titles-like-a-pro" className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                            <p className="text-lg text-blue-800 font-bold flex items-center justify-end">Next <i className="fas fa-arrow-right pl-1"></i></p>
                            <p className="pt-2">Next.js Headless WordPress Setup: Displaying Post Titles Like a Pro</p>
                        </Link>
                    </div>

                    {/* Comment Form Start */}
                    <CommentForm postId={postData.databaseId} commentCount={commentCount} comments={comments} />
                    {/* Comment Form End */}

                    <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-5 mb-10 p-6">
                        <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                            <img src="https://source.unsplash.com/collection/1346951/150x150?sig=1" className="rounded-full shadow h-32 w-32" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center md:justify-start">
                            <p className="font-semibold text-2xl">Mofizul Islam</p>
                            <p className="pt-2">I'm an experienced frontend developer with 10 years of experience in various technologies like Javascript, PHP, WordPress, Laravel, ReactJS, and more, creating innovative digital solutions.</p>
                            {/* <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
                                <Link className="hover:text-gray-200 hover:underline px-4" href="/about-us">
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        style={{ fontSize: 20, color: "#000", marginRight: '5px' }}
                                    />
                                    Facebook</Link>
                                <a className="pl-4" href="#">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a className="pl-4" href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="pl-4" href="#">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div> */}
                        </div>
                    </div>

                </section>

                <Sidebar />

            </div>

        <Footer />
        </>
    )
}