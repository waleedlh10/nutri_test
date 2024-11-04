import React from 'react';
import { render } from '@testing-library/react';
import TimeFilter from './TimeFilter';

test('renders TimeFilter', () => {
    const { getByText } = render(<TimeFilter />);
    const linkElement = getByText(/Hello, TimeFilter!/i);
    expect(linkElement).toBeInTheDocument();
});
