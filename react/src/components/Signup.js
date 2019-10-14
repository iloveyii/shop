import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';
import {apiServer} from '../common/constants';
import axios from 'axios';


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            login: false
        }
    }

    handleChange(e) {
        e.preventDefault();
        const field = e.target.id;
        const value = e.target.value;
        this.setState({[field]: value});
    }

    async handleSignUp(e) {
        e.preventDefault();
        const url = apiServer + '/api/v1/users';
        const {username, email, password} = this.state;
        const item = {username, email, password};

        try {
            await axios.post(url, {item})
                .then(res => {
                    if (res.data && res.data.authenticated) {
                        this.setState({login: true});
                    }
                    console.log('res', res.data);
                    if(res.data.status === 1) {
                        this.props.history.push('/dashboard');
                    }
                    return res.data;
                }).catch(error => {
                throw new Error(error);
                console.dir(error);
            });
        } catch (e) {
            alert('Some error occurred, please refresh page. ' + e.message);
        }
    }

    render() {

        this.state.login && this.props.history.push('/dashboard');

        return (
            <section id="dashboard" className="dashboard">
                <div className="dashboard--center" style={{textAlign: 'center', float: 'none'}}>

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <form action=""
                              style={{width: '500px', backgroundColor: 'black', padding: '40px', borderRadius: '5px'}}>
                            <p style={{textAlign: 'right'}}><Link to="/login"> Back to login </Link></p>
                            <h1>Sign Up</h1>
                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" id="email" placeholder="Type email" value={this.state.email}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" id="username" placeholder="Type username"
                                           value={this.state.username}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="password" id="password" placeholder="Type password"
                                           value={this.state.password}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">

                                    <button style={{width: '80px'}} type="submit"
                                            onClick={e => this.handleSignUp(e)}><i
                                        className="fas fa-user-edit"></i> Sign up
                                    </button>

                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </section>
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Signup));
