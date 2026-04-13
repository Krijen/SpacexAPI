import { useNavigate } from 'react-router-dom';
import { Launch } from '../types';
import './LaunchCard.css';

interface Props {
  launch: Launch;
  index: number;
}

const LaunchCard = ({ launch, index }: Props) => {
  const navigate = useNavigate();

  const date = new Date(launch.date_utc);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const getStatusClass = () => {
    if (launch.upcoming) return 'status-upcoming';
    if (launch.success === true) return 'status-success';
    if (launch.success === false) return 'status-failure';
    return 'status-unknown';
  };

  const getStatusLabel = () => {
    if (launch.upcoming) return 'Upcoming';
    if (launch.success === true) return 'Success';
    if (launch.success === false) return 'Failed';
    return 'Unknown';
  };

  return (
    <div
      className="launch-card"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.8)}s` }}
      onClick={() => navigate(`/launch/${launch.id}`)}
    >
      <div className="card-patch">
        {launch.links.patch.small ? (
          <img src={launch.links.patch.small} alt={`${launch.name} patch`} />
        ) : (
          <div className="patch-placeholder">🚀</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="flight-number mono">#{launch.flight_number}</span>
          <span className={`status-badge ${getStatusClass()}`}>{getStatusLabel()}</span>
        </div>

        <h3 className="card-title">{launch.name}</h3>

        <div className="card-meta">
          <span className="meta-item">
            <span className="meta-icon">📅</span>
            <span className="mono">{formattedDate}</span>
          </span>
          {launch.links.youtube_id && (
            <span className="meta-item has-video">
              <span className="meta-icon">▶</span>
              <span>Video</span>
            </span>
          )}
        </div>

        {launch.details && (
          <p className="card-details">{launch.details}</p>
        )}
      </div>

      <div className="card-arrow">›</div>
    </div>
  );
};

export default LaunchCard;
