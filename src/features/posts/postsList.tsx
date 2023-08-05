
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, postType } from "./postsSlice";
import { useEffect } from "react";

import PostsExcerpt from "./PostsExcerpt";

const postsList = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectAllPosts);
    const postStatus = useAppSelector(getPostsStatus);
    const error = useAppSelector(getPostsError);
    
    useEffect(() => {

        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])


    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a: postType, b: postType) => b.date.localeCompare(a.date))
        console.log(orderedPosts);
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
        
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};

export default postsList;
