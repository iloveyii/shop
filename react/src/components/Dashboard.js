import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {apiServer} from '../common/constants';
import Sidebar from './Sidebar';
import PieDemo from './PieDemo';

import {
    BarChart, Bar, ResponsiveContainer, LineChart, Line, ReferenceLine,
    ReferenceDot, CartesianGrid, XAxis, Cell, YAxis, Tooltip, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList
} from 'recharts';


const endPoint = '/v2/calculator/api/?zone=';
const server = apiServer + endPoint;

const data2 = [
    {name: 'Page A', uv: 300, pv: 2600, amt: 3400},
    {name: 'Page B', uv: 400, pv: 4367, amt: 6400},
    {name: 'Page C', uv: 300, pv: 1398, amt: 2400},
    {name: 'Page D', uv: 200, pv: 9800, amt: 2400},
    {name: 'Page E', uv: 278, pv: 3908, amt: 2400},
    {name: 'Page F', uv: 189, pv: 4800, amt: 2400},
    {name: 'Page G', uv: 189, pv: 4800, amt: 2400},
];

const data = [
    {name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20]},
    {name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40]},
    {name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40},
    {name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20},
    {name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28},
    {name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20]},
    {name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40]},
    {name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28},
    {name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28},
    {name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60]},
];


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const colors = ['red', 'green', 'blue', 'orange', 'beige', 'purple', 'pink', 'brown'];
        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <div className="dashboard--center" onClick={this.handleCenterClick}>
                    <h1>Dashboard</h1>
                    <div style={{padding: '40px', backgroundColor: 'white', borderRadius: '3px'}}>

                        <div className="row">
                            <div className="col-1-of-1">
                                <PieDemo/>
                            </div>
                            <div className="col-1-of-1">
                                <LineChart
                                    width={400}
                                    height={400}
                                    data={data}
                                    margin={{top: 5, right: 20, left: 10, bottom: 5}}
                                >
                                    <XAxis dataKey="name"/>
                                    <Tooltip/>
                                    <CartesianGrid stroke="#f5f5f5"/>
                                    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0}/>
                                    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1}/>
                                </LineChart>
                            </div>
                            <div className="col-1-of-1">
                                <BarChart width={400} height={400} data={data} onClick={this.handlePvBarClick}>
                                    <XAxis dataKey="name"/>
                                    <YAxis yAxisId="a"/>
                                    <YAxis yAxisId="b" orientation="right"/>
                                    <Legend/>
                                    <Tooltip/>
                                    <CartesianGrid vertical={false}/>
                                    <Bar yAxisId="a" dataKey="uv" onAnimationStart={this.handleBarAnimationStart}
                                         onAnimationEnd={this.handleBarAnimationEnd}>
                                        <LabelList fill="#000" angle={-45}/>
                                        {
                                            data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % 20]}/>
                                            ))
                                        }
                                    </Bar>
                                    <Bar yAxisId="b" dataKey="pv" label>
                                        {
                                            data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % 20]}/>
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
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
