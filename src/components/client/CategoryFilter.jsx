const categories = [
  { value: '', label: 'Todas as categorias' },
  { value: 'landscapes', label: 'Paisagens' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'space', label: 'Espaço' },
  { value: 'nature', label: 'Natureza' },
  { value: 'urban', label: 'Urbano' },
  { value: 'vintage', label: 'Vintage' },
]

function CategoryFilter({ category, onCategoryChange }) {
  return (
    <select
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      style={{
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        fontSize: '16px',
        backgroundColor: 'white',
        cursor: 'pointer',
      }}
    >
      {categories.map((cat) => (
        <option key={cat.value} value={cat.value}>{cat.label}</option>
      ))}
    </select>
  )
}

export default CategoryFilter
