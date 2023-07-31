import { useAppDispatch } from "../../app/hooks";
import { reactionAdded, postType, reaction } from "./postsSlice";


const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}
type propsType = {
    post: postType
}

const reactionButton = ({post}: propsType) => {

    const dispatch = useAppDispatch()

    const reactButtons = Object.entries(reactionEmoji).map(([nam, emoji]) => {
        return (
            <button
                key={nam}
                type="button"
                className="reactionButton"
                onClick={() => dispatch(reactionAdded({postId: post.id, reaction: nam}))}
            >
                {emoji} {post.reactions[nam as keyof reaction]}
            </button>
        )
    })

    
    return <div>{reactButtons}</div>
}

export default reactionButton

