
import TimeAgo from "./TimeAgo";
import PostAuthor from "./postAuthor";
import ReactionButton from "./reactionButton";
import { propsType } from './reactionButton';

const PostsExcerpt = ({ post }: propsType) => {
    return (
        <article >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    )
}

export default PostsExcerpt
