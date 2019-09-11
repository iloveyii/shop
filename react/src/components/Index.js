import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {apiServer} from '../common/constants';
import Sidebar from './Sidebar';
import Center from './Center';


const endPoint = '/v2/calculator/api/?zone=';
const server = apiServer + endPoint;


class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center />
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Index));
