import React from "react";
//import Map from "./components/Map";

import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

import districtsGeojson from "./districts.js";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const COLORS = [
    [100, 100, 100],
    [220, 220, 60],
    [160, 80, 160],
    [255, 255, 230]
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 1080,
                height: 720,
                longitude: -72.8,
                latitude: 44.0,
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
        const districtsLayer = this.state.data
            ? new GeoJsonLayer({
                  id: "districts",
                  data: this.state.data,
                  filled: true,
                  stroked: true,
                  opacity: 0.8,
                  getFillColor: x => COLORS[x.properties.district],
                  getLineColor: x => [200,200,200],
                  getLineWidth: x => 100
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
                    <DeckGL
                        {...viewport}
                        layers={
                            districtsLayer
                                ? [districtsLayer]
                                : []
                        }
                    />
                </MapGL>
            </main>
        );
    }
}

//export const App = () => <main><Map /></main>

export default App;
