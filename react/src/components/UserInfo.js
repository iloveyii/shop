import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import axios from 'axios';


class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: 'root',
            password: '',
            login: true
        }
    }

    componentDidMount() {
        const { login } = this.props;
        console.log('componentDidMount', login);
        this.setState({username: login.username});
    }

    render() {

        return (
            <div style={{width: '300px', float: 'right'}}>
                    <span style={{
                        display: 'inline-block',
                        padding: '8px',
                        backgroundColor: 'black',
                        borderRadius: '3px',
                        width: '120px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: 'white'
                    }}>
                        <i className="fas fa-user"></i>  {this.state.username}
                    </span>
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    login: state.login,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(UserInfo));
