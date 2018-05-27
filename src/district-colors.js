const COLORS = [
    "#f0f9fe", // B000
    "#f6917b", // R05
    "#fde2c7", // E21
    "#fbb884", // YR15
    "#14b37d", // G17
    "#ffd274", // Y38
    "#2b64a9", // B39
    "#e6c3a3", // E35
    "#fed2b9" // E93
];

const hexToRGB = hex => {
    // thanks to sindresorhus/hex-rgb/
    const num = parseInt(hex.replace("#", ""), 16);
    const red = num >> 16;
    const green = (num >> 8) & 255;
    const blue = num & 255;
    return [red, green, blue];
};

export const colorByDistrict = (censusTracts, districts) => {
    const features = districts
        .map((d, districtNumber) =>
            d.map(index => {
                return {
                    ...censusTracts.features[index],
                    properties: {
                        ...censusTracts.features[index].properties,
                        district: districtNumber,
                        color: hexToRGB(COLORS[districtNumber])
                    }
                };
            })
        )
        .reduce(
            (accumulatedFeatures, featuresInOneDistrict) => [
                ...accumulatedFeatures,
                ...featuresInOneDistrict
            ],
            []
        );
    return {
        ...censusTracts,
        features
    };
};
