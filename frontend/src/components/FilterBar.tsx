import './FilterBar.css';

export type FilterStatus = 'all' | 'success' | 'failed' | 'upcoming';

interface Props {
  active: FilterStatus;
  onChange: (f: FilterStatus) => void;
  counts: Record<FilterStatus, number>;
}

const filters: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'success', label: 'Success' },
  { key: 'failed', label: 'Failed' },
  { key: 'upcoming', label: 'Upcoming' },
];

const FilterBar = ({ active, onChange, counts }: Props) => {
  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${active === f.key ? 'active' : ''} filter-${f.key}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
          <span className="filter-count">{counts[f.key]}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
