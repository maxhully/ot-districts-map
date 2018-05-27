import React from "react";

import Map from "./components/Map";
import Controls from "./components/Controls";
import TextInput from "./components/TextInput";

import { getCensusTracts } from "./census-client";
import { getDistricts } from "./api";
import { colorByDistrict } from "./district-colors";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusTractsGeojson: {},
            stateName: "Vermont",
            numberOfDistricts: 2,
            previousStateName: "Vermont",
            previousNumberOfDistricts: 2
        };
    }
    componentDidMount = () => {
        this.getCensusTracts().then(districts => this.getDistricts());
    };
    getCensusTracts = () => {
        return getCensusTracts(this.state.stateName)
            .then(geojson =>
                this.setState(state => ({
                    ...state,
                    censusTractsGeojson: geojson
                }))
            )
            .catch(reason => console.error(reason));
    };
    getDistricts = () => {
        return getDistricts(this.state.stateName, this.state.numberOfDistricts)
            .then(districts =>
                colorByDistrict(this.state.censusTractsGeojson, districts)
            )
            .then(geojson => this.setState({ censusTractsGeojson: geojson }));
    };
    onChangeStateName = event => {
        this.setState({
            stateName: event.target.value
        });
    };
    onChangeNumberOfDistricts = event => {
        this.setState({
            numberOfDistricts: event.target.value
        });
    };
    shouldGetNewDistricts = ({
        stateName,
        previousStateName,
        numberOfDistricts,
        previousNumberOfDistricts
    }) => {
        return (
            stateName !== previousStateName ||
            numberOfDistricts !== previousNumberOfDistricts
        );
    };
    shouldGetNewGeojson = ({ stateName, previousStateName }) => {
        return stateName !== previousStateName;
    };
    onGo = event => {
        if (this.shouldGetNewDistricts(this.state)) {
            this.getDistricts();
        }
        if (this.shouldGetNewGeojson(this.state)) {
            this.getCensusTracts();
        }
        this.setState(state => ({
            previousNumberOfDistricts: state.numberOfDistricts,
            previousStateName: state.stateName
        }));
    };
    render = () => (
        <main>
            <h1>Optimal Transport Districts</h1>
            <Map layerData={this.state.censusTractsGeojson} />
            <Controls>
                <TextInput
                    label="State"
                    value={this.state.stateName}
                    onChange={this.onChangeStateName}
                />
                <TextInput
                    label="Number of Districts"
                    value={this.state.numberOfDistricts}
                    onChange={this.onChangeNumberOfDistricts}
                />
                <button onClick={this.onGo}>Go</button>
            </Controls>
        </main>
    );
}

export default App;
