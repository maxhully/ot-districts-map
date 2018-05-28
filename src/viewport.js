import bbox from "@turf/bbox";
import center from "@turf/center";

const zoomLevels = [
    { degrees: 180, level: 1 },
    { degrees: 90, level: 2 },
    { degrees: 45, level: 3 },
    { degrees: 22.5, level: 4 },
    { degrees: 11.25, level: 5 },
    { degrees: 5.625, level: 6 }
];

const getZoomAndCenterThatFit = featureCollection => {
    const box = bbox(featureCollection);
    const diameter = Math.max(box[3] - box[1], box[2] - box[0]);
    const zoomLevelThatFits = Math.max(
        ...zoomLevels
            .filter(({ degrees }) => degrees > diameter)
            .map(({ level }) => level)
    );
    const centerPoint = center(featureCollection);
    console.log(centerPoint);
    return {
        zoom: zoomLevelThatFits,
        longitude: centerPoint.geometry.coordinates[0],
        latitude: centerPoint.geometry.coordinates[1]
    };
};

export default getZoomAndCenterThatFit;
