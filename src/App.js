import React from "react";
//import Map from "./components/Map";

import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

import districtsGeojson from "./districts.js";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 1080,
                height: 720,
                longitude: -77.86,
                latitude: 40.7934,
                zoom: 7,
                pitch: 0,
                bearing: 0
            }
        };
    }
    componentDidMount = () => {
        this.setState(state => ({ ...state, data: districtsGeojson() }));
    };
    onViewportChange = viewport => {
        this.setState(state => ({
            ...this.state,
            viewport: { ...state.viewport, ...viewport }
        }));
    };
    render() {
        const layer = this.state.data
            ? new GeoJsonLayer({
                  id: "districts",
                  data: this.state.data,
                  filled: true,
                  opacity: 0.8,
                  getFillColor: x => [136, 28, 28]
              })
            : null;
        const { viewport } = this.state;
        return (
            <main>
                <MapGL
                    {...viewport}
                    onViewportChange={this.onViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                >
                    <DeckGL {...viewport} layers={layer ? [layer] : []} />
                </MapGL>
            </main>
        );
    }
}

//export const App = () => <main><Map /></main>

export default App;
