const RefreshButton = ({ onClick }) => {
  return (
    <button onClick={onClick} aria-label="Manual refresh">
      Manual Refresh
    </button>
  );
};

export default RefreshButton;