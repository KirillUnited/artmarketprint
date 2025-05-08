import { create } from 'zustand'

interface ProductState {
  selectedColor: string
  selectedSize: string
  setSelectedColor: (color: string) => void
  setSelectedSize: (size: string) => void
  resetSelections: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  selectedColor: '',
  selectedSize: '',
  
  setSelectedColor: (color: string) => 
    set(() => ({ selectedColor: color })),
    
  setSelectedSize: (size: string) => 
    set(() => ({ selectedSize: size })),
    
  resetSelections: () => 
    set(() => ({ selectedColor: '', selectedSize: '' }))
}))
