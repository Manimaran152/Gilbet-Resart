import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Flame, ShoppingBag, Check } from 'lucide-react';

// Authentic images sourced from open-source repository (Unsplash)
const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Madurai Kari Dosa',
    description: 'A thick, fluffy dosa topped with minced mutton cooked in authentic Madurai spices, egg, and fresh curry leaves.',
    price: '₹350',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIdqn4C_PRu8B6FwR1AlvHbJ0cKUVyTjEsUw&s', // Authentic Kari Dosa representation
    category: 'main',
    spicyLevel: 3,
  },
  {
    id: '2',
    name: 'Chettinad Chicken',
    description: 'A fiery curry made with fresh ground spices, coconut, and black pepper. A classic from the Chettinad region.',
    price: '₹420',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop', // Authentic Spicy Curry
    category: 'main',
    spicyLevel: 3,
  },
  {
    id: '3',
    name: 'Ghee Pongal',
    description: 'Comfort food made of rice and lentils, tempered with black pepper, cumin, ginger, and cashew nuts in generous amounts of ghee.',
    price: '₹180',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop', // Pongal representation
    category: 'breakfast',
    spicyLevel: 1,
  },
  {
    id: '4',
    name: 'Jigarthanda',
    description: 'The famous cooling drink from Madurai made with milk, almond gum, sarsaparilla root syrup, and ice cream.',
    price: '₹150',
    imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800&auto=format&fit=crop', // Rich milkshake/falooda style
    category: 'beverage',
    spicyLevel: 1,
  },
  {
    id: '5',
    name: 'Elaneer Payasam',
    description: 'A delicate dessert made with tender coconut meat and condensed milk. A sweet ending to a spicy meal.',
    price: '₹200',
    imageUrl: 'data:image/jpeg;base64,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', // Creamy dessert
    category: 'dessert',
    spicyLevel: 1,
  },
  {
    id: '6',
    name: 'Idli with Meen Kulambu',
    description: 'Steaming hot idlis served with a spicy, tangy fish curry made with tamarind and sesame oil.',
    price: '₹280',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Idli served with dips
    category: 'main',
    spicyLevel: 2,
  },
];

const Menu: React.FC = () => {
  const [orders, setOrders] = useState<Set<string>>(new Set());

  const toggleOrder = (id: string) => {
    const newOrders = new Set(orders);
    if (newOrders.has(id)) {
      newOrders.delete(id);
    } else {
      newOrders.add(id);
    }
    setOrders(newOrders);
  };

  return (
    <section id="menu" className="py-24 bg-tamil-cream relative">
      {/* Decorative background pattern */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-tamil-saffron uppercase tracking-[0.2em] font-bold text-sm">Our Culinary Heritage</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-tamil-earth mt-3 mb-4">
            The Gillbet Feast
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-tamil-leaf w-12"></div>
            <p className="text-gray-500 italic font-serif">Authentic flavors from the heart of Tamil Nadu</p>
            <div className="h-px bg-tamil-leaf w-12"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MENU_ITEMS.map((item) => {
            const isOrdered = orders.has(item.id);
            return (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-tamil-saffron/20 flex flex-col h-full">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-tamil-earth shadow-sm">
                    {item.price}
                  </div>
                  {isOrdered && (
                    <div className="absolute inset-0 z-30 bg-tamil-saffron/80 flex items-center justify-center backdrop-blur-[2px] animate-fade-in">
                      <div className="text-white text-center">
                        <Check className="w-12 h-12 mx-auto mb-2" />
                        <span className="font-bold text-lg">Added to Feast</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-tamil-earth transition-colors">{item.name}</h3>
                    <div className="flex space-x-0.5 mt-1" title={`Spicy Level: ${item.spicyLevel}`}>
                      {[...Array(3)].map((_, i) => (
                        <Flame 
                          key={i} 
                          className={`w-4 h-4 ${i < item.spicyLevel ? 'text-orange-500 fill-orange-500' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-light leading-relaxed text-sm mb-6 flex-grow">
                    {item.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => toggleOrder(item.id)}
                      className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2
                        ${isOrdered 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-white text-tamil-saffron border border-tamil-saffron hover:bg-tamil-saffron hover:text-white'
                        }`}
                    >
                      {isOrdered ? (
                        <>
                          <Check className="w-4 h-4" /> Selected
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" /> Order Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Menu;