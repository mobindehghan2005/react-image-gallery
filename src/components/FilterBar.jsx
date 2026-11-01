const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
  categories,
}) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title or amount..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
};

export default FilterBar;