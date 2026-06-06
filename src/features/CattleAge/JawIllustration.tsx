import React from 'react';

type ToothType = 'M' | 'P' | 'W';

interface JawIllustrationProps {
  pattern: ToothType[];
}

export const JawIllustration: React.FC<JawIllustrationProps> = ({ pattern }) => {
  // Angles for the 8 lower incisors
  const angles = [-42, -30, -18, -6, 6, 18, 30, 42];

  const renderTooth = (type: ToothType, angle: number, index: number) => {
    let path = '';
    let fill = '';
    let stroke = '';

    switch (type) {
      case 'M': // Milk
        path = "M -4,0 C -5,-15 -3,-20 0,-22 C 3,-20 5,-15 4,0 Z";
        fill = "#fdfbf7"; // Slightly off-white
        stroke = "#d6d3d1";
        break;
      case 'P': // Permanent
        path = "M -8,0 C -12,-20 -10,-38 0,-40 C 10,-38 12,-20 8,0 Z";
        fill = "#ffffff"; // Bright white
        stroke = "#a8a29e";
        break;
      case 'W': // Worn
        path = "M -7,0 C -7,-12 -5,-16 -2,-17 L 2,-17 C 5,-16 7,-12 7,0 Z";
        fill = "#fef08a"; // Yellowish, worn
        stroke = "#78716c";
        break;
      default:
        return null;
    }

    return (
      <g key={index} transform={`translate(150, 180) rotate(${angle}) translate(0, -100)`}>
        {/* Shadow/Root base to give depth */}
        <path d={path} fill={fill} stroke={stroke} strokeWidth="1.5" />
        {/* Subtle highlight */}
        {type === 'P' && (
           <path d={`M -3, -5 L -3, -35`} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        )}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 300 200" className="w-full h-full max-h-64 object-contain filter drop-shadow-md">
      <defs>
        <radialGradient id="gumGradient" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#f87171" />
        </radialGradient>
      </defs>
      
      {/* Background/Inside Mouth shading */}
      <path d="M 60,110 A 100 100 0 0 1 240,110 L 150, 190 Z" fill="#4c0519" opacity="0.1" />

      {/* Teeth */}
      {pattern.map((type, i) => renderTooth(type, angles[i], i))}

      {/* Gum Line */}
      <path 
        d="M 60,105 A 110 110 0 0 1 240,105" 
        stroke="url(#gumGradient)" 
        strokeWidth="20" 
        strokeLinecap="round" 
        fill="none" 
        className="drop-shadow-sm"
      />
      {/* Subtle gum detail line */}
      <path 
        d="M 60,100 A 110 110 0 0 1 240,100" 
        stroke="#ef4444" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.3"
      />
    </svg>
  );
};
