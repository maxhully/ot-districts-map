import React from "react";

import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: 1080,
                height: 600,
                longitude: -72.8,
                latitude: 44.0,
                zoom: 6,
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
    render() {
        const districtsLayer = this.props.layerData
            ? new GeoJsonLayer({
                  id: "districts",
                  data: this.props.layerData,
                  filled: true,
                  stroked: true,
                  opacity: 0.9,
                  getFillColor: x => x.properties.color || [50,50,50],
                  getLineColor: x => [200, 200, 200],
                  getLineWidth: x => 100
              })
            : null;
        const { viewport } = this.state;
        return (
            <MapGL
                {...viewport}
                onViewportChange={this.onViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <DeckGL
                    {...viewport}
                    layers={districtsLayer ? [districtsLayer] : []}
                />
            </MapGL>
        );
    }
}

export default Map;
