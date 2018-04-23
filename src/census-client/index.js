export default () => {
    console.log("Fetching Boston map");
    return fetch(
        "https://api.censusreporter.org/1.0/geo/tiger2016/16000US2507000?geom=true"
    )
        .then(response => response.json())
        .catch(reason => console.error("Couldn't fetch the Boston map!"));
};
