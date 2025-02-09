import React from 'react';

const Snowflake = ({ size = 200, color = 'white', branchLengthRatio = 0.6, subBranchLengthRatio = 0.5, subBranchAngle = 30 }) => {

  const numPoints = 6;

  const generatePoints = () => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 360;
      const x = size / 2 + (size / 2) * Math.cos(angle * Math.PI / 180);
      const y = size / 2 + (size / 2) * Math.sin(angle * Math.PI / 180);
      points.push({ x, y });
    }
    return points;
  };

  const points = generatePoints();

  const renderBranch = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const branchLength = Math.sqrt(dx * dx + dy * dy) * branchLengthRatio;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const subBranch1 = {
      x: end.x + branchLength * Math.cos((angle + subBranchAngle) * Math.PI / 180),
      y: end.y + branchLength * Math.sin((angle + subBranchAngle) * Math.PI / 180),
    };
    const subBranch2 = {
      x: end.x + branchLength * Math.cos((angle - subBranchAngle) * Math.PI / 180),
      y: end.y + branchLength * Math.sin((angle - subBranchAngle) * Math.PI / 180),
    };

    const subBranchLength1 = Math.sqrt(
      (subBranch1.x - end.x) ** 2 + (subBranch1.y - end.y) ** 2
    );

    const subBranchLength2 = Math.sqrt(
      (subBranch2.x - end.x) ** 2 + (subBranch2.y - end.y) ** 2
    );


    return (
      <g>
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round" // Make line endings rounded
        />

        <line
          x1={end.x}
          y1={end.y}
          x2={subBranch1.x}
          y2={subBranch1.y}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1={end.x}
          y1={end.y}
          x2={subBranch2.x}
          y2={subBranch2.y}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {points.map((point, index) => {
        const nextIndex = (index + 1) % numPoints;
        return (
          <g key={index}>
            {renderBranch(points[index], points[nextIndex])}
            {renderBranch(points[index], { x: size - points[nextIndex].x, y: points[nextIndex].y })}
          </g>
        );
      })}
    </svg>
  );
};

export default Snowflake;
