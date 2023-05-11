import { useState } from 'react';
import { usePosts } from '../hooks';
import { addPost } from '../api';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addinPost, setAddingPost] = useState(false);
  const posts = usePosts();
  const handleAddPostClick = async () => {
    setAddingPost(true);

    const response = await addPost(post);
    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addinPost}
        >
          {addinPost ? 'Adding Post ...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
