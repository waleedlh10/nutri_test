import React from 'react';
import { render } from '@testing-library/react';
import StatisticsChartContainer from './StatisticsChartContainer';

test('renders StatisticsChartContainer', () => {
    const { getByText } = render(<StatisticsChartContainer />);
    const linkElement = getByText(/Hello, StatisticsChartContainer!/i);
    expect(linkElement).toBeInTheDocument();
});
