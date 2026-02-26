const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;