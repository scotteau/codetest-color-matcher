import React from 'react';
import './App.css';
import * as rawData from "../../model/colors.json";
import {getColorDistance, hexToCMYK, hexToRGB} from "../../Utilities/utilities";
import ReactPaginate from "react-paginate";

function App() {
    const maxItem = 50;
    const pageSize = 20;

    const colorInput = React.useRef(null);

    const [inputtedColor, setInputtedColor] = React.useState();
    const [data, setData] = React.useState([]);
    const [isValid, setIsValid] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const [first, setFirst] = React.useState(0);

    React.useEffect(() => {
        if (inputtedColor) {
            const composedData = rawData.colors.map(({color, hex}) => ({
                name: color,
                hex: hex,
                rgb: hexToRGB(hex),
                cmyk: hexToCMYK(hex),
                distance: getColorDistance(inputtedColor, hex)
            })).sort((a, b) => a.distance - b.distance)
                .slice(0, maxItem)
                .map((item, index) => ({
                    ...item,
                    index: index
                }));

            const result = composedData.slice(first, first + pageSize);
            setData(result);
        }
    }, [inputtedColor, first])

    const checkIsValid = (hex) => {
        const validator = /^#[a-f0-9]{6}$/i;
        return validator.test(hex);
    }

    const handleChange = (event) => {
        const hex = event.target.value;
        hex.length > 0 && setTouched(true)
        setIsValid(checkIsValid(hex));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (isValid) {
            const result = colorInput.current.value;
            setInputtedColor(result);
            reset();
        } else {
            setTouched(true);
            setIsValid(false);
        }
    };

    const reset = () => {
        colorInput.current.value = "";
        setIsValid(false);
        setTouched(false);
        colorInput.current.blur();
        setData([]);
    }

    const assignClasses = `colorInput ${touched && !isValid && "colorInput--invalid"} ${touched && isValid && "colorInput--valid"}`;
    const handlePageClick = e => {
        const selectedPage = e.selected;
        const first = Math.ceil(selectedPage * pageSize);
        setFirst(first);
    };

    const handleBlur = () => {
        setTouched(false);
    };

    const randomColor = event => {
        event.preventDefault();
        const randomIndex = Math.floor(Math.random() * rawData.colors.length)
        const randomColor = rawData.colors[randomIndex].hex;
        reset();
        setInputtedColor(randomColor);
    };

    const selectColor = hex => {
        if (hex !== inputtedColor) {
            colorInput.current.value = hex;
            colorInput.current.focus();
            setTouched(true);
            setIsValid(checkIsValid(hex));
        }
    };

    return (
        <div className="App">
            <div className="target"
                 style={{background: inputtedColor ? inputtedColor : "transparent"}}>
                <span>{inputtedColor}</span>
            </div>

            <h1>Find the 50 Most Matched Colors</h1>

            <form onSubmit={(event) => handleSubmit(event)}>
                <div>

                    <input type="text"
                           onChange={(event) => handleChange(event)}
                           ref={colorInput}
                           placeholder={"#Hex"}
                           className={assignClasses}
                           onBlur={() => handleBlur()}
                           spellCheck={"false"}
                    />
                    <span className={"button"}
                          onClick={(event) => randomColor(event)}
                    >Random Color</span>
                </div>
                <p className={`error ${touched && !isValid && "error--show"}`}>The hex format is not correct</p>
            </form>

            {data.length > 0 && <>
                <ReactPaginate
                    pageCount={Math.ceil(maxItem / pageSize)}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    previousClassName={'previous'}
                    nextClassName={'next'}
                    previousLinkClassName={'previous__link'}
                    nextLinkClassName={'next__link'}
                    pageRangeDisplayed={pageSize}
                    marginPagesDisplayed={2}
                    onPageChange={(e) => handlePageClick(e)}
                    containerClassName={'pagination'}
                    pageClassName={'page'}
                    pageLinkClassName={'page__link'}
                    breakClassName={'break-me'}
                    initialPage={0}
                    activeClassName={'page--active'}
                />
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
                    {
                        data.map(({name, hex, rgb, cmyk, index}) => (
                            <tr key={hex} onClick={() => selectColor(hex)}>
                                <td className={"index"}>{index + 1}</td>
                                <td>
                                    <div className="display" style={{background: hex}}/>
                                </td>
                                <td className="name">{name}</td>
                                <td className="hex">{hex}</td>
                                <td className="rgb">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</td>
                                <td className="cmyk">{`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`}</td>
                            </tr>
                        ))
                    }
                    </tbody>

                </table>
            </>}
        </div>
    );
}

export default App;
