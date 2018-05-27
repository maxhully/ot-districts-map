import { stateGeoidFromName, isStateName } from "../data/states";

const levels = { blockGroups: 150, censusTracts: 140 };

let callsMade = 0;
let savedData = {};

export const getCensusTracts = (stateName, release = "tiger2016") => {
    if (!isStateName(stateName)) {
        return new Promise((resolve, reject) =>
            reject({ error: "stateName is not a real state name" })
        );
    }
    const geoid = levels.censusTracts + "|" + stateGeoidFromName(stateName);
    if (callsMade > 0) {
        callsMade += 1;
        return savedData;
    }
    callsMade += 1;
    return fetch(
        `https://api.censusreporter.org/1.0/geo/show/${release}?geo_ids=${geoid}`
    )
        .then(response => {
            savedData = response.json();
            return response.json();
        })
        .catch(reason => {
            console.error("Couldn't fetch from api.censusreporter.org");
            return reason;
        });
};

export default getCensusTracts;
