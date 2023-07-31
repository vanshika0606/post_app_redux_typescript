import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";

export type reaction = {
    thumbsUp: number,
    wow: number,
    heart: number,
    rocket: number,
    coffee: number
}

export type postType = {
    id: string,
    title: string,
    content: string,
    userId?: string
    date: string,
    reactions: reaction
}

// interface existingPost {
//     posts: postType[] | undefined
// }


const initialState: postType[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<postType>) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action){
            const { postId , reaction } = action.payload;

            const existingPost= state.find(post => post.id === postId);

            if(existingPost) {
                existingPost.reactions[reaction as keyof reaction]++;
            }
        }
    }
})

export const selectAllPosts = (state: RootState) => state.posts

export default postSlice.reducer;
export const { postAdded, reactionAdded } = postSlice.actions;