import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { notifyMessage } from '../reducers/notificationReducer';


const Notification = (props) => {
  const style = {
    padding: 10,
    marginTop: '15px',
    marginBottom: '15px',
  };
  
  useEffect(() => {
    if (props.notification.message !== '') {
      const timer = setTimeout(() => {
        props.notifyMessage('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [props.notification.message]);

    return (
      props.notification.message ?
        <div style={style}>
          {props.notification.message}
        </div>
        : null
    );
  };

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  notifyMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
