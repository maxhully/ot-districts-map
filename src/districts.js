//import union from "@turf/union";

import tracts from "./data/vermont.json";

import districts from "./data/vermont_districts.json";

export default function districtsGeojson() {
    /*const polygons = districts.map((indices, j) => ({
        ...union(...tracts["features"].filter((x, i) => i in indices)),
        properties: { id: j }
    }));
    console.log(polygons);
    return polygons;*/
    return {
        ...tracts,
        features: tracts.features.map((x, i) => ({
            ...x,
            properties: { ...x.properties, district: i in districts[0] ? 1 : 2 }
        }))
    };
}
