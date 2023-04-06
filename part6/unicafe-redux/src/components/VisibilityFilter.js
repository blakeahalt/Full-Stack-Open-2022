import { filterChange } from '../reducers/filterReducer';
import { useDispatch, useSelector } from 'react-redux';

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector(state => state.filter);

  const filterSelected = (value) => {
    console.log(value)
    dispatch(filterChange(value))
  }
  
  return (
    <div style={{ margin: '15px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }} >
        <div style={{ display: 'flex', marginRight: '10px' }}>
          <input type="radio" name="filter" 
            onChange={() => filterSelected('ALL')} checked={selectedFilter === 'ALL'} />
            all
        </div>
        <div style={{ display: 'flex', marginRight: '10px' }}>
          <input type="radio" name="filter" 
            onChange={() => filterSelected('IMPORTANT')} checked={selectedFilter === 'IMPORTANT'} />
            important    
        </div>
        <div style={{ display: 'flex', marginRight: '10px' }}>
          <input type="radio" name="filter" 
            onChange={() => filterSelected('NONIMPORTANT')} checked={selectedFilter === 'NONIMPORTANT'} />
            nonimportant 
        </div>
      </div>
    </div>
  )
}

export default VisibilityFilter;
