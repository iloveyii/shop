import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {apiServer} from '../common/constants';
import Sidebar from './Sidebar';
// import { Chart } from 'react-charts';
import Chart from "react-google-charts";

const endPoint = '/v2/calculator/api/?zone=';
const server = apiServer + endPoint;

const data2 = [
    ["Element", "Density", {role: "style"}],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
];


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <div className="dashboard--center" onClick={this.handleCenterClick}>
                    <h1>Dashboard</h1>
                    <div style={{padding: '40px', backgroundColor: 'white', borderRadius: '3px'}}>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Chart
                                    chartType="ColumnChart"
                                    width="100%"
                                    height="400px"
                                    data={data2}
                                />

                            </div>

                            <div className="col-1-of-2">
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Task', 'Hours per Day'],
                                        ['Work', 11],
                                        ['Eat', 2],
                                        ['Commute', 2],
                                        ['Watch TV', 2],
                                        ['Sleep', 7],
                                    ]}
                                    options={{
                                        title: 'My Daily Activities',
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-1-of-2">
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Language', 'Speakers (in millions)'],
                                        ['Assamese', 13],
                                        ['Bengali', 83],
                                        ['Bodo', 1.4],
                                        ['Dogri', 2.3],
                                        ['Gujarati', 46],
                                        ['Hindi', 300],
                                        ['Kannada', 38],
                                        ['Kashmiri', 5.5],
                                        ['Konkani', 5],
                                        ['Maithili', 20],
                                        ['Malayalam', 33],
                                        ['Manipuri', 1.5],
                                        ['Marathi', 72],
                                        ['Nepali', 2.9],
                                        ['Oriya', 33],
                                        ['Punjabi', 29],
                                        ['Sanskrit', 0.01],
                                        ['Santhali', 6.5],
                                        ['Sindhi', 2.5],
                                        ['Tamil', 61],
                                        ['Telugu', 74],
                                        ['Urdu', 52],
                                    ]}
                                    options={{
                                        title: 'Indian Language Use',
                                        legend: 'none',
                                        pieSliceText: 'label',
                                        slices: {
                                            4: {offset: 0.2},
                                            12: {offset: 0.3},
                                            14: {offset: 0.4},
                                            15: {offset: 0.5},
                                        },
                                    }}
                                    rootProps={{'data-testid': '5'}}
                                />
                            </div>

                            <div className="col-1-of-2">
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="BubbleChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['ID', 'X', 'Y', 'Temperature'],
                                        ['', 80, 167, 120],
                                        ['', 79, 136, 130],
                                        ['', 78, 184, 50],
                                        ['', 72, 278, 230],
                                        ['', 81, 200, 210],
                                        ['', 72, 170, 100],
                                        ['', 68, 477, 80],
                                    ]}
                                    options={{
                                        colorAxis: {colors: ['yellow', 'red']},
                                    }}
                                    rootProps={{'data-testid': '2'}}
                                />
                            </div>
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
