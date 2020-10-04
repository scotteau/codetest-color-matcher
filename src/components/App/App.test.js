import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {hexToCMYK} from "../../Utilities/utilities";

test('renders learn react link', () => {
    const {getByText} = render(<App/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test('#000000 convert to cmyk correct', () => {
    const black = "#000000";
    const cmyk = hexToCMYK(black);

    expect(cmyk.c).toBe(0);
    expect(cmyk.m).toBe(0);
    expect(cmyk.y).toBe(0);
    expect(cmyk.k).toBe(100);
})
