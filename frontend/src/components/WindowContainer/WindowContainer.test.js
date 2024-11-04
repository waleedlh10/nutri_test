import React from 'react';
import { render } from '@testing-library/react';
import WindowContainer from './WindowContainer';

test('renders WindowContainer', () => {
    const { getByText } = render(<WindowContainer />);
    const linkElement = getByText(/Hello, WindowContainer!/i);
    expect(linkElement).toBeInTheDocument();
});
