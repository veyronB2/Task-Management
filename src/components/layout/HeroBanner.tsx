import { MotionProps, motion } from "framer-motion";
import React, { useMemo } from "react";
import { Typography, TypographyVariant } from "@mui/material";

type Align = "inherit" | "left" | "center" | "right" | "justify";

interface HeroBannerProps {
    title: string;
    variant?: TypographyVariant;
    align?: Align;
    animation?: MotionProps;
}

const fontSizes = { xs: "1.8rem", sm: "2.4rem", md: "3rem", lg: "3.5rem" };

const HeroBanner = ({ variant = "h1", align = "center", title, animation }: HeroBannerProps) => {

    const Wrapper = useMemo(() => animation ? motion.div : React.Fragment, [animation]);

    return (
        <Wrapper {...(animation || {})}>
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
        </Wrapper>
    );
};

export default HeroBanner;
