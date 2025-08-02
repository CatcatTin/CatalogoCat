import { AdminPanel } from './components/AdminPanel.js'
import { ProductDisplay } from './components/ProductDisplay.js'
import { supabase } from './config/supabase.js'

// Make supabase available globally for compatibility
window.supabase = supabase

// Initialize components
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize admin panel
    new AdminPanel()
    
    // Initialize product display with database integration
    new ProductDisplay()
    
    console.log('Application initialized successfully')
  } catch (error) {
    console.error('Error initializing application:', error)
    
    // Fallback to original functionality if database is not available
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'js/main.js'
    document.head.appendChild(script)
  }
})

// Integrate with existing cart functionality
document.addEventListener('productAdded', (e) => {
  const productData = e.detail
  
  // Try to integrate with existing cart system
  if (window.carritoAgregados && typeof window.imprimirProductosEnCarrito === 'function') {
    // Check if product already exists in cart
    const existingProduct = window.carritoAgregados.find(p => p.sku == productData.sku)
    
    if (existingProduct) {
      existingProduct.cantidad++
    } else {
      window.carritoAgregados.push({
        ...productData,
        cantidad: 1
      })
    }
    
    window.imprimirProductosEnCarrito()
    
    // Show toast notification if available
    if (window.Toastify) {
      window.Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        className: "toastifyToast"
      }).showToast()
    }
  }
})