import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {apiServer} from '../common/constants';
import Sidebar from './Sidebar';
import { Chart } from 'react-charts';



const endPoint = '/v2/calculator/api/?zone=';
const server = apiServer + endPoint;


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const data = [
                {
                    label: 'Series 1',
                    data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
                },
                {
                    label: 'Series 2',
                    data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
                }
            ] ;

        const axes = [
                { primary: true, type: 'linear', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ];

        const options = {
            title: {
                text: "Basic Column Chart"
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "Apple",  y: 10  },
                        { label: "Orange", y: 15  },
                        { label: "Banana", y: 25  },
                        { label: "Mango",  y: 30  },
                        { label: "Grape",  y: 28  }
                    ]
                }
            ]
        };



        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <div className="dashboard--center" onClick={this.handleCenterClick}>
                    <h1>Dashboard</h1>
                    <div style={{padding: '40px', backgroundColor: 'white', borderRadius: '3px'}}>
                        <div
                            style={{
                                width: '400px',
                                height: '300px'
                            }}
                        >
                            <Chart data={data} axes={axes} />


                        </div>
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Dashboard));
