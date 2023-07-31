
import { useAppSelector } from "../../app/hooks";
import { selectAllPosts } from "./postsSlice";
import TimeAgo from "./TimeAgo";

import PostAuthor from "./postAuthor";
import ReactionButton from "./reactionButton";

const postsList = () => {
    const posts = useAppSelector(selectAllPosts);


    const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedPost = orderPosts.map((post) => {
        return (<article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButton post={post}/>
        </article>)
});

    return (
        <section>
            <h2>Posts</h2>
            {renderedPost}
        </section>
    );
};

export default postsList;
