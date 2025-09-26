import { View } from "react-native";

interface Circle {
    width: number;
    height: number;
    borderRadius: number;
    fillColor?: string;
    className?: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export default function CircleShape(c: Circle) {
    return (
        <View
            className={`${c.className?? ""}`}

            style={{
                width: c.width,
                height: c.height,
                borderRadius: c.borderRadius,
                position: 'absolute',
                ...(c.fillColor !== undefined && { backgroundColor: c.fillColor }),
                ...(c.top !== undefined && { top: c.top }),
                ...(c.right !== undefined && { right: c.right }),
                ...(c.bottom !== undefined && { bottom: c.bottom }),
                ...(c.left !== undefined && { left: c.left }),
                zIndex: 0
            }}
        />
    );
}