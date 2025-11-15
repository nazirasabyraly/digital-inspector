import React from "react";

interface BoundingBox {
  bbox: [number, number, number, number];
  label: string;
  color: string;
}

interface Props {
  imageUrl: string;
  boxes: BoundingBox[];
}

const BoundingBoxCanvas: React.FC<Props> = ({ imageUrl, boxes }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8">
      <img src={imageUrl} alt="Preview" className="w-full rounded-xl" />
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {boxes.map((box, idx) => {
          const [x1, y1, x2, y2] = box.bbox;
          return (
            <g key={idx}>
              <rect
                x={x1}
                y={y1}
                width={x2 - x1}
                height={y2 - y1}
                stroke={box.color}
                strokeWidth={3}
                fill="none"
                rx={8}
                filter="url(#glow)"
              />
              <text
                x={x1}
                y={y1 - 8}
                fill={box.color}
                fontSize={16}
                fontFamily="monospace"
                fontWeight="bold"
                textShadow="0 0 8px #000"
              >
                {box.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BoundingBoxCanvas;
