
// // src/Redux/Slice/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItems: [], // Stores items in the cart
//   },
//   reducers: {
//     addItemToCart: (state, action) => {
//       const { pid, productname, price, quantity } = action.payload;

//       const existingItem = state.cartItems.find(item => item.pid === pid);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.cartItems.push({ pid, productname, price, quantity });
//       }
//     },
//     removeItemFromCart: (state, action) => {
//       const pid = action.payload;
//       state.cartItems = state.cartItems.filter(item => item.pid !== pid);
//     },
//     updateCartQuantity: (state, action) => {
//       const { pid, quantity } = action.payload;

//       const existingItem = state.cartItems.find(item => item.pid === pid);
//       if (existingItem) {
//         existingItem.quantity = quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.cartItems = []; // Clear the cart
//     },
//     rehydrateCart: (state, action) => {
//       state.cartItems = action.payload; // Set the cartItems to the stored data
//     },
//   },
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   updateCartQuantity,
//   clearCart,
//   rehydrateCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;



// src/features/cart/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { fetchCartItems, addItemToCart, createCart } from './../Action/cartActions';

// const initialState = {
//   cart: [],
//   status: 'idle', // idle | loading | succeeded | failed
//   error: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart Items
//       .addCase(fetchCartItems.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCartItems.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.cart = action.payload;
//       })
//       .addCase(fetchCartItems.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Add Item to Cart
//       .addCase(addItemToCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addItemToCart.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.cart.push(action.payload);
//       })
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Create Cart
//       .addCase(createCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createCart.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.cart = [];
//       })
//       .addCase(createCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default cartSlice.reducer;

// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCartItems,
  addItemToCart,
  createCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from './../Action/cartActions';

const initialState = {
  cart: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart.push(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Cart
      .addCase(createCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = [];
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update Item Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the specific item in the cart
        const updatedItem = action.payload;
        const index = state.cart.findIndex(item => item.cart_id === updatedItem.cart_id);
        if (index !== -1) {
          state.cart[index] = updatedItem;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Remove Item from Cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the item from the cart by cart_id
        state.cart = state.cart.filter(item => item.cart_id !== action.payload);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
