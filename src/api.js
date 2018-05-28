import { stateGeoidFromName } from "./data/states";

const BACKEND_URL = "https://optimal-districts-api.now.sh";

const twoDigitStateGeoid = stateName => {
    return stateGeoidFromName(stateName).slice(-2);
};

export const getDistricts = async (stateName, numberOfDistricts) => {
    const response = await fetch(
        `${BACKEND_URL}/?s=${twoDigitStateGeoid(
            stateName
        )}&n=${numberOfDistricts}`
    );
    if (response.ok) {
        const json = await response.json();
        const districts = json.districts;
        return districts;
    } else {
        return { error: "The response was not ok", response: response };
    }
};
