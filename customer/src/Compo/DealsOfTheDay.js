import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function DealsOfTheDay() {
  const deals = [
    {
      name: 'Smartphone Sale',
      image: 'https://images.unsplash.com/photo-1724341039339-036842055cae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Fashion Discounts',
      image: 'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Home Appliances',
      image: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Books at 50% Off',
      image: 'https://images.unsplash.com/photo-1672309558498-cfcc89afff25?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Beauty Products',
      image: 'https://images.unsplash.com/photo-1527632911563-ee5b6d53465b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Toys for Kids',
      image: 'https://images.unsplash.com/photo-1599623560574-39d485900c95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Fitness Gear',
      image: 'https://media.istockphoto.com/id/1362684836/photo/a-happy-sporty-couple-doing-exercises-for-biceps-with-barbells-in-a-gym-and-making-eye.webp?a=1&b=1&s=612x612&w=0&k=20&c=pFpd6VODK5ZgTINaITNzGTtApTcx2naeCpDMxF83DcE=',
    },
    {
      name: 'Groceries & Essentials',
      image: 'https://images.unsplash.com/photo-1709234549991-2afdbad0fb0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(deals.length / 4));
    }, 4000);
    return () => clearInterval(interval);
  }, [deals.length]);

  // Show 4 items per slide
  const chunkDeals = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const dealChunks = chunkDeals(deals, 4); // Group 4 deals per slide

  return (
    <section className="container mx-auto py-12 px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">Deals of the Day</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {dealChunks.map((chunk, index) => (
            <div key={index} className="min-w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-4 gap-4">
              {chunk.map((deal) => (
                <div key={deal.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="overflow-hidden"> {/* Wrapper for zoom effect */}
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-[200px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{deal.name}</h3>
                    <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full mt-2 font-semibold hover:bg-yellow-500 transition">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + dealChunks.length) % dealChunks.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % dealChunks.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}

export default DealsOfTheDay;
