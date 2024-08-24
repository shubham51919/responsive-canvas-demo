import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { BackgroundImage } from './BackgroundImage';
import BGIMG from './assets/BGIMG.avif'

/**
 * ResponsiveCanvas Component
 * 
 * This component is a responsive, zoomable, and pannable canvas built using React Konva.
 * It automatically adjusts to the size of its parent container and allows users to zoom 
 * and pan the content, which is an image in this case.
 */
const ResponsiveCanvas = () => {
    const parentRef = useRef(null);  // Reference to the parent container
    const stageRef = useRef(null);   // Reference to the Konva Stage (canvas)
    const [scale, setScale] = useState(1);  // State for scaling (zoom level)
    const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });  // State for canvas position (for panning)
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });  // State for the canvas size
    const [image, setImage] = useState(null);  // State for the image object
    const imgData = BGIMG;  // Base64 string of the image
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });  // State for the image size
    const [dataVersion, setDataVersion] = useState(0);  // State for managing updates (if needed)
    const [zoomPercentage, setZoomPercentage] = useState(200);  // State for managing zoom percentage
    const [open, setOpen] = useState(false);  // State for managing UI dialog/modal (if any)

    /**
     * useEffect to handle resizing of the canvas based on the parent container.
     * It listens to window resize events and adjusts the canvas size accordingly.
     */
    useEffect(() => {
        const handleResize = () => {
            if (parentRef.current) {
                setStageSize({
                    width: parentRef.current.offsetWidth,
                    height: parentRef.current.offsetHeight
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * handleWheel - Manages zooming on mouse wheel scroll. It adjusts the scale
     * and repositions the canvas to maintain the zoom focus on the pointer position.
     */
    const handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const stage = stageRef.current;
        const oldScale = scale;

        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setScale(newScale);
        setStagePosition({
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        });
    };

    /**
     * useEffect to handle touch gestures for zooming (pinch-to-zoom).
     * It calculates the distance between two touch points to determine the zoom level.
     */
    useEffect(() => {
        const stage = stageRef.current;
        if (stage) {
            let lastCenter = null;
            let lastDist = 0;

            stage.on('touchmove', (e) => {
                e.evt.preventDefault();
                const touch1 = e.evt.touches[0];
                const touch2 = e.evt.touches[1];

                if (touch1 && touch2) {
                    if (stage.isDragging()) {
                        stage.stopDrag();
                    }

                    const p1 = { x: touch1.clientX, y: touch1.clientY };
                    const p2 = { x: touch2.clientX, y: touch2.clientY };

                    if (!lastCenter) {
                        lastCenter = getCenter(p1, p2);
                        return;
                    }
                    const newCenter = getCenter(p1, p2);

                    const dist = getDistance(p1, p2);

                    if (!lastDist) {
                        lastDist = dist;
                    }

                    const pointTo = {
                        x: (newCenter.x - stage.x()) / scale,
                        y: (newCenter.y - stage.y()) / scale,
                    };

                    const newScale = scale * (dist / lastDist);

                    setScale(newScale);
                    setStagePosition({
                        x: newCenter.x - pointTo.x * newScale,
                        y: newCenter.y - pointTo.y * newScale,
                    });

                    lastDist = dist;
                    lastCenter = newCenter;
                }
            });

            stage.on('touchend', () => {
                lastCenter = null;
                lastDist = 0;
            });

            return () => {
                stage.off('touchmove');
                stage.off('touchend');
            };
        }
    }, [scale]);

    /**
     * getDistance - Helper function to calculate the distance between two points.
     * This is used to determine the scaling factor during pinch-to-zoom.
     */
    const getDistance = (p1, p2) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };

    /**
     * getCenter - Helper function to calculate the center point between two points.
     * This is used to determine the center of zoom during pinch-to-zoom.
     */
    const getCenter = (p1, p2) => {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        };
    };

    /**
     * useEffect to load the image, set its size, and center it within the canvas.
     * The image is loaded once and centered based on the parent container's dimensions.
     */
    useEffect(() => {
        const img = new window.Image();
        img.src = imgData;
        img.onload = () => {
            setImage(img);
            setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
            setStageSize({ width: parentRef.current.offsetWidth, height: parentRef.current.offsetHeight });

            // Center the image within the canvas
            const scale = Math.min(parentRef.current.offsetWidth / img.naturalWidth, parentRef.current.offsetHeight / img.naturalHeight);
            setScale(scale);
            setStagePosition({
                x: (parentRef.current.offsetWidth - img.naturalWidth * scale) / 2,
                y: (parentRef.current.offsetHeight - img.naturalHeight * scale) / 2
            });
        };
    }, []);

    return (
        <div ref={parentRef} style={{ width: 'calc(100vw - 100px)', height: 'calc(100vh - 100px)', border: '1px solid white', overflow: "hidden" }}>
            {image && (
                <Stage
                    ref={stageRef}
                    width={stageSize.width}
                    height={stageSize.height}
                    scaleX={scale}
                    scaleY={scale}
                    x={stagePosition.x}
                    y={stagePosition.y}
                    draggable
                    onWheel={handleWheel}
                    onDragEnd={(e) => {
                        setStagePosition({ x: e.target.x(), y: e.target.y() });
                    }}
                >
                    <Layer>
                        <BackgroundImage
                            image={image}
                            width={imageSize.width}
                            height={imageSize.height}
                        />
                    </Layer>
                </Stage>
            )}
        </div>
    );
};

export default ResponsiveCanvas;
