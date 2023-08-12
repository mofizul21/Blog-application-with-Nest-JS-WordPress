import Head from "next/head";
import { allCategory, getCategoryDetails, getCategorySlugs, getPostList } from "../../../lib/posts";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedImage from "@/components/FeaturedImage";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Date from "@/components/Date";
import LoadMore from "@/components/LoadMore";

export async function getStaticPaths() {
    const categories = await getCategorySlugs();

    return {
        paths: categories.map((category) => (
            {
                params: {
                    categoryName: category.slug,
                }
            }
        )),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const allCategories = await allCategory();

    const categoryPosts = await getPostList(null, { key: "categoryName", value: params.categoryName });

    const categoryDetails = await getCategoryDetails(params.categoryName);

    return {
        props: {
            allCategories,
            categoryPosts,
            categoryDetails,
        },
    };
}

const allCategories = await allCategory();

export default function CategoryPosts({ allCategories, categoryPosts, categoryDetails }) {
    const [categories, setCategories] = useState(allCategories);
    const [posts, setPosts] = useState(categoryPosts);


    return (
        <>
            <Head>
                <title>{`${categoryDetails.name} - Post Verses`}</title>
                <meta name="description" content="technology" key="meta-description" />
            </Head>

            <Header categories={categories} />

            <div className="container mx-auto py-10 border-y">
                <section className="w-full flex flex-col items-center py-6">
                    <h1 className="text-4xl font-bold">{categoryDetails.name}</h1>

                    <p className="text-2xl mt-3">
                    {categoryDetails.count > 0 ? `Category ${ categoryDetails.name } has ${ categoryDetails.count } posts.` : `Category ${categoryDetails.name} has no post.`}
                    </p>
                    
                    <p>{categoryDetails.description}</p>
                </section>
            </div>

            <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full md:w-2/3 flex flex-col items-center px-3">

                    {posts.nodes.map((post) => (

                        <article className="flex flex-col shadow my-4" key={post.slug}>
                            <FeaturedImage post={post} />
                            <div className="bg-white flex flex-col justify-start p-6">
                                {post.categories.nodes.map((category) => (
                                    <Link key={category.slug} href={`/category/${ category.slug }`} className="text-blue-700 text-sm font-bold uppercase pb-4">{category.name}</Link>
                                ))}

                                <Link href={`/blog/${ post.slug }`} className="text-3xl font-bold hover:text-gray-700 pb-4 text-gray-800">{post.title}</Link>

                                <p className="text-sm pb-3 text-gray-800">
                                    By <Link href={`author/${ post.author.node.slug }`} className="font-semibold hover:text-gray-800 text-gray-800">{post.author.node.name}</Link>, Published on <Date dateString={post.date} />
                                </p>

                                <div className="pb-6 text-gray-800" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>

                                <Link href={`/blog/${ post.slug }`} className="uppercase text-gray-800 hover:text-gray-800 ">Continue Reading <svg className='continueIcon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                                </Link>
                            </div>
                        </article>

                    ))}

                    <div className="flex items-center py-8">
                        <LoadMore posts={posts} setPosts={setPosts} />
                    </div>
                </section>

                <Sidebar />

            </div>

            <Footer />
        </>
    )
}