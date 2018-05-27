import { stateGeoidFromName } from "./data/states";

const { BACKEND_URL } =
    process.env.BACKEND_URL || "https://optimal-districts-api.now.sh";

const twoDigitStateGeoid = stateName => {
    return stateGeoidFromName(stateName).slice(-2);
};

export const computeDistricts = (stateName, numberOfDistricts) => {
    fetch(
        `${BACKEND_URL}/?s=${twoDigitStateGeoid(
            stateName
        )}n=${numberOfDistricts}`
    ).then(response => response.json());
};
