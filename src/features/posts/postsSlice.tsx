import { PayloadAction, createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export type reaction = {
    thumbsUp: number,
    wow: number,
    heart: number,
    rocket: number,
    coffee: number
}
type addPost ={
    title: string,
    body: string,
    userId?: string
}

export type postType = {
    id: string,
    title: string,
    body: string,
    userId?: string
    date: string,
    reactions: reaction
}

// interface existingPost {
//     posts: postType[] | undefined
// }

type initialPost = {
    posts: postType[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null | undefined
}

const initialState: initialPost = {
    posts: [],
    status: 'idle',
    error: null
}
    // {
    //     id: '1',
    //     title: 'Learning Redux Toolkit',
    //     content: "I've heard good things.",
    //     date: sub(new Date(), { minutes: 10 }).toISOString(),
    //     reactions: {
    //         thumbsUp: 0,
    //         wow: 0,
    //         heart: 0,
    //         rocket: 0,
    //         coffee: 0
    //     }
    // },
    // {
    //     id: '2',
    //     title: 'Slices...',
    //     content: "The more I say slice, the more I want pizza.",
    //     date: sub(new Date(), { minutes: 5 }).toISOString(),
    //     reactions: {
    //         thumbsUp: 0,
    //         wow: 0,
    //         heart: 0,
    //         rocket: 0,
    //         coffee: 0
    //     }
    // }
// ]



export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () =>{
    try{
        const response = await axios.get(POSTS_URL);
        // console.log(response.data)
        return (response.data) ;
    } catch(err){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post: addPost)=>{

    const response = await axios.post(POSTS_URL, post);
    return response.data;
})



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<postType>) {
                state.posts.push(action.payload)
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
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

            const existingPost= state.posts.find(post => post.id === postId);

            if(existingPost?.reactions) {
                existingPost.reactions[reaction as keyof reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
            
                let min = 1;
                const loadedPosts = action.payload.map((post : postType) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                // Add any fetched posts to the array
                state.posts
                = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
               
                // const sortedPosts = state.posts.sort((a, b) => {
                //     if (a.id > b.id) return 1
                //     if (a.id < b.id) return -1
                //     return 0
                // })
                // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
    }
})

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;


export default postSlice.reducer;
export const { postAdded, reactionAdded } = postSlice.actions;