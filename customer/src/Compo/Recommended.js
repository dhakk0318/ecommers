import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Recommended() {
  const products = [
    {
      name: "Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1598698287642-9ceaf9a7a011?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹1999",
      rating: 5,
      reviews: 42,
    },
    {
      name: "Smart Watch",
      image:
        "https://images.unsplash.com/photo-1698729616509-060e8f58e6c0?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹4999",
      rating: 4,
      reviews: 35,
    },
    {
      name: "Gaming Mouse",
      image:
        "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fEdhbWluZyUyME1vdXNlfGVufDB8fDB8fHww",
      price: "₹1499",
      rating: 5,
      reviews: 50,
    },
    {
      name: "Bluetooth Speaker",
      image:
        "https://images.unsplash.com/photo-1725016935000-3a9661531f59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹2999",
      rating: 4,
      reviews: 60,
    },
    {
      name: "LED Monitor",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹8999",
      rating: 5,
      reviews: 80,
    },
    {
      name: "Laptop Stand",
      image:
        "https://images.unsplash.com/photo-1705907014910-979144d70805?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹999",
      rating: 4,
      reviews: 25,
    },
    {
      name: "Mechanical Keyboard",
      image:
        "https://images.unsplash.com/photo-1626958390898-162d3577f293?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹2499",
      rating: 5,
      reviews: 72,
    },
    {
      name: "Portable Charger",
      image:
        "https://images.unsplash.com/photo-1677145503755-5a8c581671fe?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹1299",
      rating: 4,
      reviews: 45,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move the slide
  const handleSlide = (direction) => {
    if (direction === "next") {
      setCurrentSlide((prev) => Math.min(prev + 1, products.length - 4));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="container mx-auto py-12 px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }} // Move one card (25% width)
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="w-1/4 flex-shrink-0 p-2" // Width set to 1/4 (4 cards visible)
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="overflow-hidden"> {/* Wrapper for zoom effect */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current text-yellow-500"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="text-lg font-bold">{product.price}</div>
                  <button className="mt-4 w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSlide("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleSlide("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}

export default Recommended;
