import { connect } from 'react-redux';
import React from 'react';

class ErrorMsg extends React.Component {
    render() {
        return (
            this.props.reduxState.message && <h4 className='error'>{this.props.reduxState.message}</h4>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxState: state
    }
};

const ConnectedErrorMsg = connect(mapStateToProps)(ErrorMsg);

export default ConnectedErrorMsg;
