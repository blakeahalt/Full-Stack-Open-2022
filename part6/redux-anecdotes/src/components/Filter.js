import { useQueryClient } from 'react-query';

const Filter = () => {
  const queryClient = useQueryClient();

  const filterHandler = (event) => {
    const filter = event.target.value;
    const data = queryClient.getQueryData('anecdotes');
    if (filter) {
      const filteredData = data.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
      queryClient.setQueryData('anecdotes', filteredData);
    } else {
      queryClient.invalidateQueries('anecdotes');
    }
  };

  return (
    <div style={{ marginLeft: '10px', marginBottom: '15px' }}>
      Filter: <input onChange={filterHandler} />
    </div>
  );
};

export default Filter;



