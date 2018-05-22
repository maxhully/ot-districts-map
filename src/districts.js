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
    const features = districts
        .map((d, districtNumber) =>
            d.map(i => {
                return {
                    ...tracts.features[i],
                    properties: {
                        ...tracts.features[i].properties,
                        district: districtNumber
                    }
                };
            })
        )
        .reduce((acc, x) => [...acc, ...x], []);
    return {
        ...tracts,
        features
    };
}
