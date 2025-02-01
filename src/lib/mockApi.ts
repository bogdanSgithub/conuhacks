export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bananas',
    image: '/placeholder.svg',
    price: '$2.99'
  },
  {
    id: '2',
    name: 'Milk',
    image: '/placeholder.svg',
    price: '$3.99'
  },
  {
    id: '3',
    name: 'Bread',
    image: '/placeholder.svg',
    price: '$4.99'
  },
  {
    id: '4',
    name: 'Eggs',
    image: '/placeholder.svg',
    price: '$5.99'
  }
];

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};