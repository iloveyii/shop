import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {apiServer} from '../common/constants';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';
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
                    <div style={{textAlign: 'right'}}><UserInfo /></div>
                    <h1>Dashboard</h1>
                    <div style={{padding: '40px', backgroundColor: 'lavenderblush', borderRadius: '3px'}}>

                        <div className="row">
                            <div className="col-1-of-4">
                                <div style={{width: '100%', height: '300px', backgroundColor: 'red', borderRadius: '3px'}}></div>
                            </div>
                            <div className="col-1-of-4">
                                <div style={{width: '100%', height: '300px', backgroundColor: 'orange', borderRadius: '3px'}}></div>
                            </div>
                            <div className="col-1-of-4">
                                <div style={{width: '100%', height: '300px', backgroundColor: 'green', borderRadius: '3px'}}></div>
                            </div>
                            <div className="col-1-of-4">
                                <div style={{width: '100%', height: '300px', backgroundColor: 'blue', borderRadius: '3px'}}></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-1">
                                <Chart
                                    width={'100%'}
                                    height={'700px'}
                                    chartType="GeoChart"
                                    data={[
                                        ['Country', 'Popularity'],
                                        ['Germany', 200],
                                        ['United States', 300],
                                        ['Brazil', 400],
                                        ['Canada', 500],
                                        ['France', 600],
                                        ['RU', 700],
                                    ]}
                                    // Note: you will need to get a mapsApiKey for your project.
                                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                                    mapsApiKey="YOUR_KEY_HERE"
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </div>
                        </div>
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

                        <div className="row">
                            <div className="col-1-of-1">
                                <Chart
                                    width="100%"
                                    height={'500px'}
                                    chartType="Histogram"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Dinosaur', 'Length'],
                                        ['Acrocanthosaurus (top-spined lizard)', 12.2],
                                        ['Albertosaurus (Alberta lizard)', 9.1],
                                        ['Allosaurus (other lizard)', 12.2],
                                        ['Apatosaurus (deceptive lizard)', 22.9],
                                        ['Archaeopteryx (ancient wing)', 0.9],
                                        ['Argentinosaurus (Argentina lizard)', 36.6],
                                        ['Baryonyx (heavy claws)', 9.1],
                                        ['Brachiosaurus (arm lizard)', 30.5],
                                        ['Ceratosaurus (horned lizard)', 6.1],
                                        ['Coelophysis (hollow form)', 2.7],
                                        ['Compsognathus (elegant jaw)', 0.9],
                                        ['Deinonychus (terrible claw)', 2.7],
                                        ['Diplodocus (double beam)', 27.1],
                                        ['Dromicelomimus (emu mimic)', 3.4],
                                        ['Gallimimus (fowl mimic)', 5.5],
                                        ['Mamenchisaurus (Mamenchi lizard)', 21.0],
                                        ['Megalosaurus (big lizard)', 7.9],
                                        ['Microvenator (small hunter)', 1.2],
                                        ['Ornithomimus (bird mimic)', 4.6],
                                        ['Oviraptor (egg robber)', 1.5],
                                        ['Plateosaurus (flat lizard)', 7.9],
                                        ['Sauronithoides (narrow-clawed lizard)', 2.0],
                                        ['Seismosaurus (tremor lizard)', 45.7],
                                        ['Spinosaurus (spiny lizard)', 12.2],
                                        ['Supersaurus (super lizard)', 30.5],
                                        ['Tyrannosaurus (tyrant lizard)', 15.2],
                                        ['Ultrasaurus (ultra lizard)', 30.5],
                                        ['Velociraptor (swift robber)', 1.8],
                                    ]}
                                    options={{
                                        title: 'Lengths of dinosaurs, in meters',
                                        legend: { position: 'none' },
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
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
