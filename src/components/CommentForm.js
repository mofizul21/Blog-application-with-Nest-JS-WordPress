import { useState } from "react";
import Date from "./Date";


export default function CommentForm({ postId, commentCount, comments }) {
    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const handleSubmit = async function (event) {
        event.preventDefault();

        setSubmitStatus(true);
        setResponseMessage('Your comment is being submitted...');
        setAlertColor('bg-yellow-500');

        let data = {
            author: event.target.author.value,
            authorEmail: event.target.authorEmail.value,
            content: event.target.content.value.replace(/\n/g, "\\n"),
            postId: event.target.postId.value,
        };

        const jsonData = JSON.stringify(data);

        const response = await fetch('/api/comment', {
            method: 'POST',
            body: jsonData,
        });

        const result = await response.json();

        console.log(result);

        setSubmitStatus(true);
        setResponseMessage(result.message);

        if (response.ok) {
            setAlertColor('bg-green-500');
        }
        else {
            setAlertColor('bg-red-500');
        }

    }

    return (
        <section className="w-full py-8 lg:py-16">
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({commentCount ? commentCount : 'No'} comments)</h2>
                </div>

                <form className="mb-6" onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="w-1/2 py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mr-2">
                            <input type="text" id="author" name="author" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Author Name" />
                        </div>

                        <div className="w-1/2 py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <input type="email" id="authorEmail" name="authorEmail" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Email" />
                        </div>
                    </div>                    

                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6" name="content"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a comment..."></textarea>
                    </div>

                    <input type="hidden" name="postId" id="postId" value={postId} />

                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                    </button>
                </form>

                {
                    submitStatus &&
                    <div className={`${ alertColor } py-2 px-4 mt-4 text-slate-100 rounded-md`}>
                        {responseMessage}
                    </div>
                }

                {comments.nodes.map((comment) => (
                    <article key={comment.id} className="p-6 mb-2 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={comment.author.node.avatar.url} 
                                    width={comment.author.node.avatar.width} height={comment.author.node.avatar.height}
                                    alt={comment.author.node.name} />{comment.author.node.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
                                    title="February 8th, 2022"><Date dateString={comment.date} /></time></p>
                        </div>
                        
                    </footer>
                        <div className="text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                </article>
                ))}
                

            </div>
        </section>
    )
}