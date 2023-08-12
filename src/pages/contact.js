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

    const [submitStatus, setSumbitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('bg-green-500');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        }

        const jsonData = JSON.stringify(data);

        const response = await fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        });

        const result = await response.json();
        console.log(result.data);


        setSumbitStatus(true);
        setResponseMessage(result.data);

        if (!response.ok) {
            setAlertColor('bg-red-500');
        }
        else {
            setAlertColor('bg-green-500');
        }
    }

    return (
        <>
            <Head>
                <title key="pagetitle">Contact - Post Verses Blog</title>
                <meta name="description" content="technology" key="meta-description" />
            </Head>

            <Header categories={categories} />

            <div className="container my-24 mx-auto md:px-6">
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-6 lg:py-12 px-4 mx-auto max-w-screen-md">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                <input name="email" type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="hello@mofizul.com" />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                <input name="subject" type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                                <textarea name="message" id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                            </div>
                            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send message</button>
                        </form>

                        {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor} /> : null}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

const SubmissionAlert = ({ message, alertColor }) => {
    return (
        <div className={`${ alertColor } py-2 px-4 mt-4 text-slate-100 rounded-md`}>
            {message}
        </div>
    )
}