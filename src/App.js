import React from "react";

import Map from "./components/Map";
import Controls from "./components/Controls"

import districtsGeojson from "./districts";

import "./App.css";

const App = () => (
    <main>
        <h1>Optimal Transport Districts</h1>
        <Map getInitialGeojson={districtsGeojson} />
        <Controls />
    </main>
);

//export const App = () => <main><Map /></main>

export default App;
