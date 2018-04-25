const levels = { blockGroups: 150, censusTracts: 140 };

const states = {
    Alabama: "04000US01",
    Alaska: "04000US02",
    Arizona: "04000US04",
    Arkansas: "04000US05",
    California: "04000US06",
    Colorado: "04000US08",
    Connecticut: "04000US09",
    Delaware: "04000US10",
    "District of Columbia": "04000US11",
    Florida: "04000US12",
    Georgia: "04000US13",
    Hawaii: "04000US15",
    Idaho: "04000US16",
    Illinois: "04000US17",
    Indiana: "04000US18",
    Iowa: "04000US19",
    Kansas: "04000US20",
    Kentucky: "04000US21",
    Louisiana: "04000US22",
    Maine: "04000US23",
    Maryland: "04000US24",
    Massachusetts: "04000US25",
    Michigan: "04000US26",
    Minnesota: "04000US27",
    Mississippi: "04000US28",
    Missouri: "04000US29",
    Montana: "04000US30",
    Nebraska: "04000US31",
    Nevada: "04000US32",
    "New Hampshire": "04000US33",
    "New Jersey": "04000US34",
    "New Mexico": "04000US35",
    "New York": "04000US36",
    "North Carolina": "04000US37",
    "North Dakota": "04000US38",
    Ohio: "04000US39",
    Oklahoma: "04000US40",
    Oregon: "04000US41",
    Pennsylvania: "04000US42",
    "Rhode Island": "04000US44",
    "South Carolina": "04000US45",
    "South Dakota": "04000US46",
    Tennessee: "04000US47",
    Texas: "04000US48",
    Utah: "04000US49",
    Vermont: "04000US50",
    Virginia: "04000US51",
    Washington: "04000US53",
    "West Virginia": "04000US54",
    Wisconsin: "04000US55",
    Wyoming: "04000US56"
};

export const getCensusTracts = (
    stateName = null,
    stateGeoid = null,
    release = "tiger2016"
) => {
    if (stateName === null && stateGeoid === null) {
        throw TypeError("getCensusTracts needs a stateName or stateGeoid");
    }
    const geoids =
        levels.censusTracts + "|" + (stateGeoid || states[stateName]);
    return fetch(
        `https://api.censusreporter.org/1.0/geo/show/${release}?geo_ids=${geoids}`
    )
        .then(response => response.json())
        .catch(reason =>
            console.error("Couldn't fetch from api.censusreporter.org")
        );
};

export default getCensusTracts;
