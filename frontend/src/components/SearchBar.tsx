import './SearchBar.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search launches...' }: Props) => {
  return (
    <div className="search-wrapper">
      <span className="search-icon">⌕</span>
      <input
        className="search-input mono"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>✕</button>
      )}
    </div>
  );
};

export default SearchBar;
