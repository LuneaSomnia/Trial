import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Snowflake = () => {
  const points = [
    { icon: '📞', href: '/contact' },
    { icon: '🏃', href: '/activity' },
    { icon: '🔐', href: '/security' },
    { icon: 'ℹ️', href: '/info' },
    { icon: '🩺', href: '/health' },
  ];

  const calculatePosition = (index) => {
    const angle = (index / points.length) * 360;
    const x = 50 + 40 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 40 * Math.sin(angle * Math.PI / 180);
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="relative w-64 h-64">
      <Image src="/snowflake.png" alt="Snowflake" layout="fill" objectFit="contain" />
      {points.map((point, index) => {
        const position = calculatePosition(index);
        return (
          <motion.a
            key={index}
            href={point.href}
            className="absolute rounded-full bg-white p-2 shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
            }}
            whileHover={{ scale: 1.1 }}
          >
            {point.icon}
          </motion.a>
        );
      })}
    </div>
  );
};

export default Snowflake;
