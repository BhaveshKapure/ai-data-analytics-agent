import React, { useState } from 'react';
import { mockCorrelationMatrix } from '../../data/mockData';

export const HeatmapComponent = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const features = ['sales', 'adSpend', 'discount', 'retention', 'churnRisk'];
  const featureLabels = ['Sales Amount', 'Ad Spend', 'Discount %', 'Retention Rate', 'Churn Risk'];

  const getColor = (val) => {
    if (val === 1.0) return 'bg-brand-blue text-white font-bold';
    if (val > 0.7) return 'bg-blue-600 text-white font-semibold';
    if (val > 0.4) return 'bg-blue-400 text-white font-medium';
    if (val > 0) return 'bg-blue-100 text-navy-900';
    if (val > -0.4) return 'bg-rose-100 text-rose-900';
    if (val > -0.7) return 'bg-rose-400 text-white font-medium';
    return 'bg-rose-600 text-white font-bold';
  };

  return (
    <div className="w-full overflow-x-auto p-2">
      <div className="min-w-[500px]">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-2 mb-2 text-xs font-bold text-navy-900 text-center">
          <div className="text-left pl-2">Feature</div>
          {featureLabels.map((label, idx) => (
            <div key={idx} className="truncate px-1" title={label}>{label}</div>
          ))}
        </div>

        {/* Matrix Rows */}
        {mockCorrelationMatrix.map((row, rIdx) => (
          <div key={rIdx} className="grid grid-cols-6 gap-2 mb-2 items-center text-xs">
            <div className="font-semibold text-navy-900 text-left pl-2 truncate" title={row.feature}>
              {row.feature}
            </div>
            {features.map((feat, cIdx) => {
              const val = row[feat];
              const isHovered = hoveredCell?.r === rIdx && hoveredCell?.c === cIdx;
              return (
                <div
                  key={cIdx}
                  onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx, val, rowName: row.feature, colName: featureLabels[cIdx] })}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`
                    py-3 px-2 rounded-xl text-center transition-all duration-200 cursor-pointer shadow-xs
                    ${getColor(val)}
                    ${isHovered ? 'scale-105 ring-2 ring-brand-cyan shadow-md z-10' : ''}
                  `}
                >
                  {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                </div>
              );
            })}
          </div>
        ))}

        {/* Hover Tooltip / Detail */}
        {hoveredCell && (
          <div className="mt-4 p-3 rounded-xl bg-navy-900 text-white text-xs flex items-center justify-between border border-navy-700 animate-in fade-in">
            <span>
              Correlation between <strong className="text-brand-cyan">{hoveredCell.rowName}</strong> and <strong className="text-brand-cyan">{hoveredCell.colName}</strong>:
            </span>
            <span className="font-extrabold text-sm px-2 py-0.5 rounded bg-brand-blue">
              r = {hoveredCell.val > 0 ? `+${hoveredCell.val}` : hoveredCell.val}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatmapComponent;
