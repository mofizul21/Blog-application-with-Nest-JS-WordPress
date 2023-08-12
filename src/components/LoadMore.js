import { getPostList } from "../../lib/posts"
import { useState } from "react"

export default function LoadMore({ posts, setPosts, taxonomy = null }){
    let bT = posts.pageInfo.hasNextPage ? 'Load more posts' : 'No more posts to load';
    let bD = posts.pageInfo.hasNextPage ? false : true;

    const [buttonText, setButtonText] = useState(bT);
    const [buttonDisabled, setButtonDisabled] = useState(bD);

    const handleOnclick = async (event) => {
        setButtonText('Loading... ');
        setButtonDisabled(true);

        const morePosts = await getPostList(posts.pageInfo.endCursor, taxonomy);

        let updatedPosts = {
            pageInfo: {

            },
            nodes: []
        }

        updatedPosts.pageInfo = morePosts.pageInfo;

        posts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        });

        morePosts.nodes.map((node) => {
            updatedPosts.nodes.push(node);
        });

        setPosts(updatedPosts);

        if (morePosts.pageInfo.hasNextPage) {
            setButtonText('Load more posts');
            setButtonDisabled(false);
        } else {
            setButtonText('You are at the end of the page');
            setButtonDisabled(true);
        }
    }

    return (
        <button 
            className="load-more bg-blue-800 text-white text-sm font-bold uppercase px-4 py-3 hover:bg-blue-700 rounded"
            onClick={handleOnclick}
            disabled={buttonDisabled}
        >
            {buttonText}
        </button>
    )
}