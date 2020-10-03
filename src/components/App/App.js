import React from 'react';
import './App.css';
import * as data from "../../model/colors.json";

function App() {

    return (
        <div className="App">
            <h2>{data.description}</h2>
            <p>{data.colors.length}</p>

        </div>
    );
}

export default App;
