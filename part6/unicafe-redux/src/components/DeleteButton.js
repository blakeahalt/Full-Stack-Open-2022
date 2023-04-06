import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux'
import { removeNote } from '../reducers/noteReducer';

function DeleteButton({ id, content }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()


  const deleteNoteMutation = useMutation(removeNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });

  // const handleDelete = () => {
  //   if (window.confirm(`Remove note "${content}"?`)) {
  //     deleteNoteMutation.mutate(id);
  //   }
  // };
  const handleDelete = () => {
    if (window.confirm(`Remove note "${content}"?`)) {
      dispatch((dispatch) => {
        deleteNoteMutation.mutate(id);
        dispatch(removeNote(id));
      });
    }
  };
  
  return (
    <button style={{ marginRight: '10px' }} onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteButton;