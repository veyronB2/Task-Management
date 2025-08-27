import { Typography, TypographyVariant } from '@mui/material';

type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';

interface HeroBannerProps {
    title: string;
    variant?: TypographyVariant;
    align?: Align
}

const fontSizes = { xs: '1.8rem', sm: '2.4rem', md: '3rem', lg: '3.5rem' }

const HeroBanner = ({ variant = "h1", align = "center", title }: HeroBannerProps) => {
  return (
    <Typography 
        variant={variant} 
        align={align} 
        gutterBottom 
        sx={{
            fontSize: fontSizes
        }}
    >
        {title}
    </Typography>
  )
}

export default HeroBanner