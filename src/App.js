import React from "react";
import Map from "./components/Map";

/*import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

import tracts from "./data/wisconsin_tracts.json";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class App extends Component {
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
    _onViewportChange = viewport => {
        this.setState(state => ({
            ...this.state,
            viewport: { ...state.viewport, ...viewport }
        }));
    };
    render() {
        const tractsLayer = new GeoJsonLayer({
            id: "tracts",
            data: tracts,
            filled: true,
            stroked: false,
            extruded: false,
            getElevation: f => f.properties["2013_population_estimate"]
        });
        const { viewport } = this.state;
        return (
            <main>
                <MapGL
                    {...viewport}
                    onViewportChange={this._onViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                >
                    <DeckGL {...viewport} layers={[tractsLayer]} />
                </MapGL>
            </main>
        );
    }
}*/

function App(props) {
    return <Map />
}

export default App;
