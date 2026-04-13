import { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLaunch } from '../hooks/useSpaceX';
import './LaunchDetail.css';

const LaunchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { launch, loading, error } = useLaunch(id || '');

  if (loading) {
    return (
      <main className="detail-page">
        <div className="detail-state">
          <div className="loader-ring" />
          <span className="mono">LOADING MISSION DATA...</span>
        </div>
      </main>
    );
  }

  if (error || !launch) {
    return (
      <main className="detail-page">
        <div className="detail-state">
          <span className="error-icon">⚠</span>
          <p className="mono">{error || 'Launch not found'}</p>
          <button className="back-btn" onClick={() => navigate('/')}>← Back to Dashboard</button>
        </div>
      </main>
    );
  }

  const date = new Date(launch.date_utc);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  const getStatusInfo = () => {
    if (launch.upcoming) return { label: 'Upcoming', cls: 'upcoming' };
    if (launch.success === true) return { label: 'Mission Success', cls: 'success' };
    if (launch.success === false) return { label: 'Mission Failed', cls: 'failure' };
    return { label: 'Status Unknown', cls: 'unknown' };
  };

  const status = getStatusInfo();

  return (
    <main className="detail-page">
      <div className="detail-inner">
        {/* Back */}
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>

        {/* Hero */}
        <div className="detail-hero">
          <div className="hero-left">
            {launch.links.patch.large ? (
              <img className="mission-patch" src={launch.links.patch.large} alt="Mission patch" />
            ) : (
              <div className="patch-empty">🚀</div>
            )}
          </div>
          <div className="hero-right">
            <div className="hero-meta">
              <span className="mono flight-no">FLIGHT #{launch.flight_number}</span>
              <span className={`status-pill status-${status.cls}`}>{status.label}</span>
            </div>
            <h1 className="mission-name">{launch.name}</h1>
            <div className="mission-date">
              <span className="date-primary">{formattedDate}</span>
              <span className="date-secondary mono">{formattedTime}</span>
            </div>
            {launch.details && (
              <p className="mission-details">{launch.details}</p>
            )}
            <div className="hero-links">
              {launch.links.wikipedia && (
                <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="ext-link">
                  📖 Wikipedia
                </a>
              )}
              {launch.links.article && (
                <a href={launch.links.article} target="_blank" rel="noreferrer" className="ext-link">
                  📰 Article
                </a>
              )}
              {launch.links.webcast && (
                <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="ext-link accent-link">
                  ▶ Watch Webcast
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Video */}
        {launch.links.youtube_id && (
          <section className="detail-section">
            <h2 className="section-title">
              <span className="title-accent">▶</span> Launch Video
            </h2>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                title="Launch video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Rocket Info */}
        {launch.rocket && (
          <section className="detail-section">
            <h2 className="section-title">
              <span className="title-accent">🚀</span> Rocket: {launch.rocket.name}
            </h2>
            <div className="info-grid">
              <div className="info-card">
                <span className="info-label">Type</span>
                <span className="info-value mono">{launch.rocket.type}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Status</span>
                <span className={`info-value mono ${launch.rocket.active ? 'text-success' : 'text-muted'}`}>
                  {launch.rocket.active ? 'Active' : 'Retired'}
                </span>
              </div>
              <div className="info-card">
                <span className="info-label">Success Rate</span>
                <span className="info-value mono accent">{launch.rocket.success_rate_pct}%</span>
              </div>
              <div className="info-card">
                <span className="info-label">Cost Per Launch</span>
                <span className="info-value mono">${launch.rocket.cost_per_launch.toLocaleString()}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Height</span>
                <span className="info-value mono">{launch.rocket.height.meters}m</span>
              </div>
              <div className="info-card">
                <span className="info-label">Mass</span>
                <span className="info-value mono">{launch.rocket.mass.kg.toLocaleString()} kg</span>
              </div>
              <div className="info-card">
                <span className="info-label">Stages</span>
                <span className="info-value mono">{launch.rocket.stages}</span>
              </div>
              <div className="info-card">
                <span className="info-label">First Flight</span>
                <span className="info-value mono">{launch.rocket.first_flight}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Engines</span>
                <span className="info-value mono">
                  {launch.rocket.engines.number}× {launch.rocket.engines.type} {launch.rocket.engines.version}
                </span>
              </div>
              <div className="info-card">
                <span className="info-label">Propellants</span>
                <span className="info-value mono">
                  {launch.rocket.engines.propellant_1} / {launch.rocket.engines.propellant_2}
                </span>
              </div>
            </div>
            {launch.rocket.description && (
              <p className="rocket-description">{launch.rocket.description}</p>
            )}
            {launch.rocket.flickr_images.length > 0 && (
              <div className="rocket-images">
                {launch.rocket.flickr_images.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt={`${launch.rocket!.name} ${i + 1}`} className="rocket-img" />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Core / Recovery Info */}
        {launch.cores.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">
              <span className="title-accent">⬡</span> Core Recovery
            </h2>
            <div className="info-grid">
              {launch.cores.map((core, i) => (
                <Fragment key={i}>
                  {core.reused !== null && (
                    <div className="info-card">
                      <span className="info-label">Reused</span>
                      <span className={`info-value mono ${core.reused ? 'text-warning' : 'text-muted'}`}>
                        {core.reused ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                  {core.flight !== null && (
                    <div className="info-card">
                      <span className="info-label">Flight #</span>
                      <span className="info-value mono">{core.flight}</span>
                    </div>
                  )}
                  {core.landing_type && (
                    <div className="info-card">
                      <span className="info-label">Landing Type</span>
                      <span className="info-value mono">{core.landing_type}</span>
                    </div>
                  )}
                  {core.landing_success !== null && (
                    <div className="info-card">
                      <span className="info-label">Landing</span>
                      <span className={`info-value mono ${core.landing_success ? 'text-success' : 'text-danger'}`}>
                        {core.landing_success ? 'Successful' : 'Failed'}
                      </span>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </section>
        )}

        {/* Failures */}
        {launch.failures.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">
              <span className="title-accent danger-accent">✕</span> Failure Analysis
            </h2>
            {launch.failures.map((f, i) => (
              <div key={i} className="failure-card">
                <div className="failure-meta mono">
                  T+{f.time}s
                  {f.altitude !== null && ` · ${f.altitude} km altitude`}
                </div>
                <p className="failure-reason">{f.reason}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default LaunchDetail;
