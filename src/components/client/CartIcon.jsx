import { useCart } from '../../context/CartContext'

function CartIcon({ onClick }) {
  const { getTotalItems } = useCart()
  const count = getTotalItems()

  return (
    <div 
      onClick={onClick}
      style={{ 
        position: 'relative', 
        cursor: 'pointer',
        padding: '8px',
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: '#ef4444',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '2px 6px',
          borderRadius: '10px',
          minWidth: '18px',
          textAlign: 'center',
        }}>
          {count}
        </span>
      )}
    </div>
  )
}

export default CartIcon
