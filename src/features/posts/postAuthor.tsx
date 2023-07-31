import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "../users/usersSlice";


type PropsType={
    userId: string | undefined
}

const postAuthor = ({ userId }: PropsType) => {

    const users = useAppSelector(selectAllUsers);

    const author = users.find(user => user.id === userId);

  return (
    <span>
      by {author ? author.name : 'Unknown author'}
    </span>
  )
}

export default postAuthor
