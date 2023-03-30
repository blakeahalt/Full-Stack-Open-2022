import { connect } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';

const Filter = (props) => {
    const filterHandler = (event) => {
        props.filterAnecdotes((event.target.value));
    };

    return (
        <div style={{ marginLeft: '10px', marginBottom: '15px' }}>
            Filter: <input onChange={filterHandler} />
        </div>
    );
};

const mapDispatchToProps = {
    filterAnecdotes
}

export default connect(null, mapDispatchToProps)(Filter);