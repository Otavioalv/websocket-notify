import { useEffect, useState } from "react";


interface windowSizeInterface {
    width: number,
    height: number
}

export default function useWindowSize (): windowSizeInterface{
    const [windowSize, setWindowSize] = useState<windowSizeInterface>({width: 0, height: 0});

    useEffect(() => {
        if(typeof window !== "undefined") {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }

            window.addEventListener("resize", handleResize);

            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowSize;
}