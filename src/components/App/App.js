import React from 'react';
import './App.css';
import * as rawData from "../../model/colors.json";
import {getColorDistance, hexToCMYK, hexToRGB} from "../../Utilities/utilities";

function App() {

    const targetColor = '#651fff';

    const [inputtedColor, setInputtedColor] = React.useState(targetColor);

    const [data, setData] = React.useState([]);

    const [isValid, setIsValid] = React.useState(false);

    const colorInput = React.useRef(null);


    function handleChange(event) {
        const hex = event.target.value;
        const validator = /^#[a-f0-9]{6}$/i;
        if (validator.test(hex)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isValid) {
            const result = colorInput.current.value;
            setInputtedColor(result);
            colorInput.current.value = "";
        } else {
            colorInput.current.value = "";
            console.log("throw an error");
        }
    }

    const renderTableContent = () => {
        return data.map(({name, hex, rgb, cmyk}, index) => (
            <tr key={hex}>
                <td className={"index"}>{index + 1}</td>
                <td>
                    <div className="display" style={{background: hex}}/>
                </td>
                <td className="name">{name}</td>
                <td className="hex">{hex}</td>
                <td className="rgb">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</td>
                <td className="cmyk">{`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`}</td>
            </tr>
        ));

    }

    React.useEffect(() => {
        if (inputtedColor) {
            const composedData = rawData.colors.map(({color, hex}) => ({
                name: color,
                hex: hex,
                rgb: hexToRGB(hex),
                cmyk: hexToCMYK(hex),
                distance: getColorDistance(inputtedColor, hex)
            })).sort((a, b) => a.distance - b.distance).slice(0, 50);

            setData(composedData);
        }
    }, [inputtedColor])


    return (
        <div className="App">
            <div className="target"
                 style={{background: inputtedColor ? inputtedColor : "transparent"}}>
                <span>{inputtedColor}</span>
            </div>

            <h1>Find the 50 Most Matched Colors</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
                <input type="text"
                       onChange={(event) => handleChange(event)}
                       ref={colorInput}
                       placeholder={"#Hex"}
                       className={`colorInput`}

                />
            </form>

            {data.length > 0 && <>
                <table>
                    <thead>

                    <tr>
                        <th className="index">#</th>
                        <th className="dot">-</th>
                        <th className="name">Name</th>
                        <th className="hex">Hex</th>
                        <th className="rgb">RGB</th>
                        <th className="cmyk">CMYK</th>
                    </tr>
                    </thead>

                    <tbody>
                    {renderTableContent()}
                    </tbody>

                </table>
            </>}
        </div>
    );
}

export default App;
