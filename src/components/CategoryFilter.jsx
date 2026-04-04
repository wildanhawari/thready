import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Filter Kategori</h2>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectCategory('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${activeCategory === '' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            #{cat}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};