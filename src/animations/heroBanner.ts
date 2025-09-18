import { MotionProps } from "framer-motion";

export const heroBannerDefaultAnimation: MotionProps = {
    initial: { y: -100, opacity: 0, rotate: -5 },
    animate: { y: 0, opacity: 1, rotate: 0 },
    transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.2,
    },
};
