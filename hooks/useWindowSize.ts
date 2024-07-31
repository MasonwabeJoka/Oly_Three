type screenSize = {
    width: number;
    height: number;
}

export default function useWindowSize(): screenSize {
    const [windowSize, setWindowSize] = useState<screenSize>({
        width: 0,
        height: 0
    });
    useEffect(() => {
        function handleResize() {   
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}   


// to use
// const size = useWindowSize();

// useEffect(() => {
//     if(size.width > 768) {
//         setSidebarOpen(false);
//     }
// }, [size.with])