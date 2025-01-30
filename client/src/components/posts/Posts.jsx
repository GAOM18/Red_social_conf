import React, { useContext } from 'react';
import Post from '../post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

const Posts = () => {
  const { currentUser } = useContext(AuthContext);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get('/posts').then(res => res.data),
  });

  if (isLoading) return <div className="loading">Cargando posts...</div>;
  if (error) return <div className="error">Error al cargar los posts</div>;

  return (
    <div className="posts">
      {posts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;