import DeckGL, { GeoJsonLayer } from "deck.gl";
import React from "react";
import MapGL, { FlyToInterpolator } from "react-map-gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class Map extends React.Component {
    render() {
        const districtsLayer = this.props.layerData
            ? new GeoJsonLayer({
                  id: "districts",
                  data: this.props.layerData,
                  filled: true,
                  stroked: true,
                  opacity: 0.9,
                  getFillColor: x => x.properties.color || [50, 50, 50],
                  getLineColor: x => [200, 200, 200],
                  getLineWidth: x => 100
              })
            : null;
        const { viewport, onViewportChange } = this.props;
        return (
            <MapGL
                {...viewport}
                transitionInterpolator={new FlyToInterpolator()}
                onViewportChange={onViewportChange}
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
