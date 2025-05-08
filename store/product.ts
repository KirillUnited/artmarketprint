import { create } from 'zustand'

interface ProductState {
  selectedColor: string
  selectedSize: string
  selectedImage: string
  setSelectedColor: (color: string) => void
  setSelectedSize: (size: string) => void
  setSelectedImage: (image: string) => void
  resetSelections: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  selectedColor: '',
  selectedSize: '',
  selectedImage: '',
  
  setSelectedColor: (color: string) => 
    set(() => ({ selectedColor: color })),
    
  setSelectedSize: (size: string) => 
    set(() => ({ selectedSize: size })),

  setSelectedImage: (image: string) =>
    set(() => ({ selectedImage: image })),
    
  resetSelections: () => 
    set(() => ({ selectedColor: '', selectedSize: '', selectedImage: '' }))
}))
