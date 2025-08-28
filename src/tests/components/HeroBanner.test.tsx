import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import HeroBanner from '../../components/HeroBanner';

describe('HeroBanner', () => {
  it('renders with default props', () => {
    const title = "Welcome to the site"
    render(<HeroBanner title={title} />);
    
    const header = screen.getByText(title);
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('MuiTypography-h1'); 
    expect(header).toHaveStyle({ textAlign: 'center' }); 
  });

  it('renders with custom variant and align', () => {
    render(<HeroBanner title="Custom Banner" variant="h3" align="left" />);
    
    const typography = screen.getByText('Custom Banner');
    expect(typography).toHaveClass('MuiTypography-h3');
    expect(typography).toHaveStyle({ textAlign: 'left' });
  });

});
