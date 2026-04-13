import React from 'react';
import { Launch } from '../types';
import './StatsBar.css';

interface Props {
  launches: Launch[];
}

const StatsBar: React.FC<Props> = ({ launches }) => {
  const total = launches.length;
  const successful = launches.filter((l) => l.success === true).length;
  const failed = launches.filter((l) => l.success === false).length;
  const upcoming = launches.filter((l) => l.upcoming).length;
  const successRate = total > 0 ? Math.round((successful / (successful + failed)) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-value mono">{total}</span>
        <span className="stat-label">Total Launches</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value mono success">{successful}</span>
        <span className="stat-label">Successful</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value mono danger">{failed}</span>
        <span className="stat-label">Failed</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value mono warning">{upcoming}</span>
        <span className="stat-label">Upcoming</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-value mono accent">{successRate}%</span>
        <span className="stat-label">Success Rate</span>
      </div>
    </div>
  );
};

export default StatsBar;
