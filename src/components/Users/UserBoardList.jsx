import CommentsTable from "./CommentsTable";
import UserPostsTable from "./UserPostsTable";
import MobileUserPostsTable from "./MobileUserPostsTable";
import MobileCommentsTable from "./MobileCommentsTable";

export default function UserBoardList({ posts, comments, openPosts }) {
  // TODO: need to prevent 무지성 api call
  // console.log(data);
  return (
    <div className="flex flex-col">
      {openPosts ? (
        <div>
          <div className="hidden md:flex">
            <UserPostsTable posts={posts} />
          </div>
          <div className="flex md:hidden">
            <MobileUserPostsTable posts={posts} />
          </div>
        </div>
      ) : (
        <div>
          <div className="hidden md:flex">
            <CommentsTable comments={comments} />
          </div>
          <div className="flex md:hidden">
            <MobileCommentsTable comments={comments} />
          </div>
        </div>
      )}
    </div>
  );
}
