import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {apiServer} from '../common/constants';
import Sidebar from './Sidebar';
import Center from './Center';


const endPoint = '/v2/calculator/api/?zone=';
const server = apiServer + endPoint;


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <div className="dashboard--center" style={{textAlign: 'center', float: 'none'}}>

                    <div style={{display: 'flex', width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

                        <form action="" style={{width: '500px', backgroundColor: 'black', padding: '40px', borderRadius: '5px'}}>
                            <h1>Login</h1>
                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" placeholder="Type username" value={this.state.name}
                                           onChange={e => this.handleName(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" placeholder="Type password" value={this.state.name}
                                           onChange={e => this.handleName(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">

                                    <button style={{width: '80px'}} type="submit"
                                            onClick={e => this.handleFormSubmit(e)}><i
                                        className="fas fa-sign-in-alt"></i> Login
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login));
