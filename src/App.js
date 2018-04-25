import React from "react";
//import Map from "./components/Map";

import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

import { getCensusTracts } from "./census-client";

const LIGHT_SETTINGS = {
    lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
    ambientRatio: 0.2,
    diffuseRatio: 0.5,
    specularRatio: 0.3,
    lightsStrength: [1.0, 0.0, 2.0, 0.0],
    numberOfLights: 2
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 1080,
                height: 720,
                longitude: -92.0,
                latitude: 45.0,
                zoom: 5,
                pitch: 0,
                bearing: 0
            }
        };
    }
    componentDidMount = () => {
        getCensusTracts("Pennsylvania").then(data => this.setState(state => ({ ...state, data })));
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
                  id: "tracts",
                  data: this.state.data["features"],
                  filled: true,
                  extruded: true,
                  opacity: 0.8,
                  getFillColor: x => [136, 28, 28],
                  getElevation: x => x.properties["2013_population_estimate"],
                  lightSettings: LIGHT_SETTINGS
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

export default App;
