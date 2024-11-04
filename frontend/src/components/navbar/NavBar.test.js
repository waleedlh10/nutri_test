import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';

test('renders NavBar', () => {
    const { getByText } = render(<NavBar />);
    const linkElement = getByText(/Hello, NavBar!/i);
    expect(linkElement).toBeInTheDocument();
});
