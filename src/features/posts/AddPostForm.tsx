import { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectAllUsers } from '../users/usersSlice';
import { postAdded } from './postsSlice';

const AddPostForm = () => {

    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    const users = useAppSelector(selectAllUsers);


    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);


    const canSave: boolean = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    const onSavePostClicked = ()=>{
        if(title && content) {
            dispatch(postAdded(title, content, userId))
        }
        setTitle('');
        setContent('');
        setUserId('');
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor"
                 value={userId} 
                onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm
