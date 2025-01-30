import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Comments = ({post_id}) => {
  const [description,setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();


  console.log("post_id:", post_id);


  const { isLoading, error, data } = useQuery({
    queryKey: ['comments', post_id],
    queryFn: () => makeRequest.get(`/comments?post_id=${post_id}`).then((res) => res.data),
    enabled: !!post_id,
  });
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      try {
        console.log("Enviando nuevo comentario:", newComment); // Revisar el payload
  const response = await makeRequest.post('/comments', newComment,{
    withCredentials: true,
  });
  console.log("Respuesta del servidor:", response.data);
        return response.data;
      } catch (error) {
        console.error('Error al crear el comentario:', error); // Depuración: Imprimir detalles del error
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('comments', post_id);
    },
  });
  const handleClick = async (e) => {
    e.preventDefault();
    const newComment = { description, post_id};
    console.log("newComment:", newComment);
    mutation.mutate(newComment);
    setDesc("")
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading comments</div>;
  
  console.log("comments data:", data);
  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profile_pic} alt="" />
        <input 
        type="text" 
        placeholder="write a comment" 
        value={description} 
        onChange={e => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data && data.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profile_pic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.description}</p>
          </div>
          <span className="date">{moment(comment.created_at).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};
export default Comments;
