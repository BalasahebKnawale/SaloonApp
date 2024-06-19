export const DateDropdown = ({ dates, onDateSelect }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="dateFilter"
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        Select Date:
      </label>
      <select
        id="dateFilter"
        name="dateFilter"
        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => onDateSelect(e.target.value)}
      >
        <option value="">All Dates</option>
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};
