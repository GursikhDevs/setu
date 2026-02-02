import MediaPost from './MediaPost';
import TextPost from './TextPosts';

const PostMapper = ({ posts }) => {
  const renderPost = (post) => {
    if (post?.media && post?.media?.url) {
      return <MediaPost key={post.id} post={post} />;
    }
    return <TextPost key={post.id} post={post} />;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {posts?.map(post => renderPost(post))}
      </div>
    </div>
  );
};

export default PostMapper;