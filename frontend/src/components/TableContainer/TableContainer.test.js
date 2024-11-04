import React from 'react';
import { render } from '@testing-library/react';
import TableContainer from './TableContainer';

test('renders TableContainer', () => {
    const { getByText } = render(<TableContainer />);
    const linkElement = getByText(/Hello, TableContainer!/i);
    expect(linkElement).toBeInTheDocument();
});
