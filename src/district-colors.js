const COLORS = [
    "#f6917b", // R05
    "#fde2c7", // E21
    "#fbb884", // YR15
    "#14b37d", // G17
    "#f0f9fe", // B000
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

export const injectProperties = (feature, properties) => {
    return {
        ...feature,
        properties: {
            ...feature.properties,
            ...properties
        }
    };
};

export const colorByDistrict = (censusTracts, districts) => {
    const geoidToIndex = censusTracts.features.reduce(
        (dictionary, district, index) => ({
            ...dictionary,
            [district.properties.geoid]: index
        }),
        {}
    );
    const allDistrictsIndices = districts.map(district =>
        district.members.map(geoid => geoidToIndex[geoid])
    );
    const features = allDistrictsIndices
        .map((districtIndices, districtNumber) =>
            districtIndices.map(index =>
                injectProperties(censusTracts.features[index], {
                    district: districtNumber,
                    color: hexToRGB(COLORS[districtNumber])
                })
            )
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
