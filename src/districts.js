import union from "@turf/union";

import tracts from "./data/pennsylvania.json";
import districts from "./data/districts.json";

export default function districtsGeojson() {
    const polygons = districts.map((indices, j) => ({
        ...union(...tracts["features"].filter((x, i) => i in indices)),
        properties: { id: j }
    }));
    console.log(polygons);
    return polygons;
}
