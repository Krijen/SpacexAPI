import { useState, useMemo } from 'react';
import { useLaunches } from '../hooks/useSpaceX';
import LaunchCard from '../components/LaunchCard';
import SearchBar from '../components/SearchBar';
import FilterBar, { FilterStatus } from '../components/FilterBar';
import StatsBar from '../components/StatsBar';
import './Dashboard.css';

const Dashboard = () => {
  const { launches, loading, error } = useLaunches();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const counts = useMemo(() => ({
    all: launches.length,
    success: launches.filter((l) => l.success === true).length,
    failed: launches.filter((l) => l.success === false).length,
    upcoming: launches.filter((l) => l.upcoming).length,
  }), [launches]);

  const filtered = useMemo(() => {
    let result = [...launches];

    if (filter === 'success') result = result.filter((l) => l.success === true);
    else if (filter === 'failed') result = result.filter((l) => l.success === false);
    else if (filter === 'upcoming') result = result.filter((l) => l.upcoming);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          (l.details?.toLowerCase().includes(q)) ||
          String(l.flight_number).includes(q)
      );
    }

    result.sort((a, b) =>
      sortOrder === 'desc'
        ? b.date_unix - a.date_unix
        : a.date_unix - b.date_unix
    );

    return result;
  }, [launches, filter, search, sortOrder]);

  return (
    <main className="dashboard">
      <div className="dashboard-inner">
        <div className="dashboard-hero">
          <h1 className="hero-title">
            <span className="hero-line1">LAUNCH</span>
            <span className="hero-line2">TRACKER</span>
          </h1>
          <p className="hero-subtitle">
            Real-time telemetry on every SpaceX mission — past, present, and future.
          </p>
        </div>

        {!loading && !error && <StatsBar launches={launches} />}

        <div className="controls">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, flight number..." />
          <div className="controls-bottom">
            <FilterBar active={filter} onChange={setFilter} counts={counts} />
            <button
              className="sort-btn mono"
              onClick={() => setSortOrder((s) => (s === 'desc' ? 'asc' : 'desc'))}
            >
              {sortOrder === 'desc' ? '↓ Newest' : '↑ Oldest'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="state-container">
            <div className="loader">
              <div className="loader-ring" />
              <span className="mono">FETCHING TELEMETRY...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="state-container">
            <div className="error-box">
              <span className="error-icon">⚠</span>
              <p className="mono">CONNECTION FAILED</p>
              <p className="error-detail">{error}</p>
              <p className="error-hint">Make sure the backend is running on port 3001.</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-info mono">
              {filtered.length === launches.length
                ? `${launches.length} missions`
                : `${filtered.length} of ${launches.length} missions`}
              {search && ` matching "${search}"`}
            </div>

            {filtered.length === 0 ? (
              <div className="state-container">
                <div className="empty-state">
                  <span className="empty-icon">🔭</span>
                  <p>No launches found matching your criteria.</p>
                </div>
              </div>
            ) : (
              <div className="launches-grid">
                {filtered.map((launch, i) => (
                  <LaunchCard key={launch.id} launch={launch} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
