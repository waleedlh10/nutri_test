import React from 'react';
import { render } from '@testing-library/react';
import DonatChartContainer from './DonatChartContainer';

test('renders DonatChartContainer', () => {
    const { getByText } = render(<DonatChartContainer />);
    const linkElement = getByText(/Hello, DonatChartContainer!/i);
    expect(linkElement).toBeInTheDocument();
});
