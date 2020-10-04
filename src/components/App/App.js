import React from 'react';
import './App.css';
import * as data from "../../model/colors.json";

function App() {

    // const targetColor = '#651fff';
    const targetColor = '#acc2d9';

    const hexToRGB = (hex) => {
        const rgb = {r: '0x' + hex[1] + hex[2] | 0, g: '0x' + hex[3] + hex[4] | 0, b: '0x' + hex[5] + hex[6] | 0};
        return rgb;
    }

    const hexToCMYK = (hex) => {
        let computedC = 0;
        let computedM = 0;
        let computedY = 0;
        let computedK = 0;

        hex = (hex.charAt(0) === "#") ? hex.substring(1, 7) : hex;

        if (hex.length !== 6) {
            alert('Invalid length of the input hex value!');
            return;
        }
        if (/[0-9a-f]{6}/i.test(hex) !== true) {
            alert('Invalid digits in the input hex value!');
            return;
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // BLACK
        if (r === 0 && g === 0 && b === 0) {
            computedK = 1;
            return [0, 0, 0, 1];
        }

        computedC = 1 - (r / 255);
        computedM = 1 - (g / 255);
        computedY = 1 - (b / 255);

        var minCMY = Math.min(computedC, Math.min(computedM, computedY));

        computedC = (computedC - minCMY) / (1 - minCMY);
        computedM = (computedM - minCMY) / (1 - minCMY);
        computedY = (computedY - minCMY) / (1 - minCMY);
        computedK = minCMY;

        const cmyk = {
            c: parseInt(Math.round(computedC * 100)),
            m: parseInt(Math.round(computedM * 100)),
            y: parseInt(Math.round(computedY * 100)),
            k: parseInt(Math.round(computedK * 100))
        };

        return cmyk;
    }

    const rgbTitle = (hex) => {
        const rgb = hexToRGB(hex);
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }

    const cmykTitle = (hex) => {
        const cmyk = hexToCMYK(hex);
        return `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
    }



    const renderTableContent = () => {
        const result = data.colors.slice(0, 10);
        return result.map(({color, hex}) => (
            <tr key={hex}>
                <td>
                    <div className="display" style={{background: hex}}/>
                </td>
                <td>{color}</td>
                <td>{hex}</td>
                <td>{rgbTitle(hex)}</td>
                <td>{cmykTitle(hex)}</td>
                <td>{colorDistance(hex, targetColor)}</td>
            </tr>
        ))

    }

    const colorDistance = (color1, color2) => {
        const rgb1 = hexToRGB(color1);
        const rgb2 = hexToRGB(color2);

        const rmean = (parseFloat(rgb1.r) + parseFloat(rgb2.r)) / 2;
        const r = parseFloat(rgb1.r) - parseFloat(rgb2.r);
        const g = parseFloat(rgb1.g) - parseFloat(rgb2.g);
        const b = parseFloat(rgb1.b) - parseFloat(rgb2.b);

        const distance = Math.sqrt((((512 + rmean)*r*r)>>8) + 4*g*g + (((767-rmean)*b*b)>>8));
        console.log(distance);

        return distance;
    }

    return (
        <div className="App">
            <div className="target" style={{background: targetColor}}/>
            <table>
                <thead>

                <tr>
                    <th>-</th>
                    <th>name</th>
                    <th>Hex</th>
                    <th>RGB</th>
                    <th>CMYK</th>
                    <th>Distance</th>
                </tr>
                </thead>

                <tbody>
                {renderTableContent()}
                </tbody>

            </table>
        </div>
    );
}

export default App;
