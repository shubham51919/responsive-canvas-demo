import { Image as KonvaImage } from 'react-konva';

export const BackgroundImage = ({ image, width, height }) => (
    <KonvaImage
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
    />
);