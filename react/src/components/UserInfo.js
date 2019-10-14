import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import axios from 'axios';


class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : 'root',
            password: '',
            login: true
        }
    }

    handleChange(e) {
        e.preventDefault();
        const field = e.target.id;
        const value = e.target.value;
        this.setState({[field]: value});
    }

    handleLogin(e) {
        e.preventDefault();
        const url = 'http://localhost:8090/api/v1/login';
        axios.get(url, {
            auth:{
                username: this.state.username,
                password: this.state.password
            },
            headers : {
                username: this.state.username,
                password: this.state.password
            }

        }).then(res => {
            if(res.data && res.data.authenticated) {
                this.setState({login: true});
            }
            console.log('res', res.data);
            return res.data;
        }).catch(error => {
            throw new Error(error);
            console.dir(error);
        });
    }

    render() {

        return (
            <div style={{width: '300px', float: 'right'}}>
                <ul style={{listStyle:'none', margin: '0'}}>
                    <li style={{ display:'inline-block', padding:'8px', backgroundColor: 'black', borderRadius:'3px', width:'120px', textAlign:'center', cursor:'pointer'}}>
                        <i className="fas fa-user"></i>  root
                    </li>
                </ul>
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    spot: state.spot,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(UserInfo));
