import React from "react";

import Map from "./components/Map";
import Controls from "./components/Controls";
import TextInput from "./components/TextInput";

import { getCensusTracts } from "./census-client";
import { computeDistricts } from "./api";
import { colorByDistrict } from "./colors";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusTractGeojson: {},
            stateName: "Vermont",
            numberOfDistricts: 2,
            previousStateName: "Vermont",
            previousNumberOfDistricts: 2
        };
    }
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
    shouldComputeNewDistricts = ({
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
    shouldFetchNewGeojson = ({ stateName, previousStateName }) => {
        return stateName !== previousStateName;
    };
    onGo = event => {
        if (this.shouldComputeNewDistricts(this.state)) {
            computeDistricts(
                this.state.stateName,
                this.state.numberOfDistricts
            ).then(fetchedDistricts => {
                this.setState({ districts: fetchedDistricts });
            });
        }
        if (this.shouldFetchNewGeojson(this.state)) {
            getCensusTracts(this.state.stateName)
                .then(fetchedGeojson => {
                    this.setState(state => ({
                        censusTractGeojson: colorByDistrict(
                            fetchedGeojson,
                            state.districts
                        )
                    }));
                })
                .catch(reason => console.error(reason));
        }
        this.setState(state => ({
            previousNumberOfDistricts: state.numberOfDistricts,
            previousStateName: state.stateName
        }));
    };
    render = () => (
        <main>
            <h1>Optimal Transport Districts</h1>
            <Map />
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
