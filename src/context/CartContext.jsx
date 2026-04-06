import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items])

  function addToCart(wallpaper) {
    setItems(prev => {
      const existing = prev.find(item => item.id === wallpaper.id)
      if (existing) {
        return prev.map(item => 
          item.id === wallpaper.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...wallpaper, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  function clearCart() {
    setItems([])
  }

  function getTotalPrice() {
    return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
  }

  function getTotalItems() {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalPrice,
      getTotalItems 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
