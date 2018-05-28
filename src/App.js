import React from "react";
import "./App.css";
import { getDistricts } from "./api";
import { getCensusTracts } from "./census-client";
import Controls from "./components/Controls";
import Header from "./components/Header";
import Map from "./components/Map";
import TextInput from "./components/TextInput";
import { colorByDistrict } from "./district-colors";
import getZoomAndCenterThatFit from "./viewport";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusTractsGeojson: {},
            stateName: "",
            numberOfDistricts: 0,
            previousStateName: null,
            status: "Ok",
            viewport: {
                width: 1080,
                height: 600,
                latitude: 38.83,
                longitude: -98.58,
                zoom: 3,
                pitch: 0,
                bearing: 0
            }
        };
    }
    resize = () => {
        this.setState(state => ({
            viewport: {
                ...state.viewport,
                width: Math.min(window.innerWidth, 1080)
            }
        }));
    };
    componentDidMount = () => {
        window.addEventListener("resize", this.resize);
    };
    onViewportChange = viewport => {
        this.setState(state => ({
            viewport: { ...state.viewport, ...viewport }
        }));
    };
    getCensusTracts = async () => {
        if (this.shouldGetNewGeojson(this.state)) {
            return await getCensusTracts(this.state.stateName);
        } else {
            return this.state.censusTractsGeojson;
        }
    };
    shouldGetNewGeojson = ({ stateName, previousStateName }) => {
        return stateName !== previousStateName;
    };
    onSubmit = async event => {
        event.target.blur();
        this.setState({ status: "Waiting..." });

        const censusTracts = await this.getCensusTracts();
        const districts = await getDistricts(
            this.state.stateName,
            this.state.numberOfDistricts
        );

        if (districts.error) {
            this.setState(state => ({ status: "Error" }));
            return;
        }

        this.flyTo(getZoomAndCenterThatFit(censusTracts));
        const newGeojson = await colorByDistrict(censusTracts, districts);
        this.setState(state => ({
            censusTractsGeojson: newGeojson,
            previousStateName: state.stateName,
            status: "Ok"
        }));
    };
    flyTo = viewport => {
        this.onViewportChange({ ...viewport, transitionDuration: 2000 });
        setTimeout(
            () => this.onViewportChange({ transitionDuration: 0 }),
            2000
        );
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
    render = () => (
        <main>
            <Header status={this.state.status} />
            <Map
                viewport={this.state.viewport}
                onViewportChange={this.onViewportChange}
                layerData={this.state.censusTractsGeojson}
            />
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
                <button onClick={this.onSubmit}>Go</button>
            </Controls>
        </main>
    );
}

export default App;
