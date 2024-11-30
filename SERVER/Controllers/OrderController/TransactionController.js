
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../../Config/db");
// const { instance } = require("../../Instance/instance.js");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRAT,
});


// exports.createRazorpayOrder = async(req, res) => {
//   const { order_id, amount } = req.body;

//   if (!order_id || !amount) {
//     return res
//       .status(400)
//       .json({ message: "Order ID and Amount are required" });
//   }

//   const options = {
//     amount: amount * 100, // Amount in paisa
//     currency: "INR",
//     receipt: `receipt_${order_id}`,
//     payment_capture: 1, // Auto capture after payment
//   };

//   razorpayInstance.orders.create(options, (err, order) => {
//     if (err) {
//       return res.status(500).json({ message: "Razorpay error", error: err });
//     }

//     // Save Razorpay order details
//     const query =
//       "UPDATE tbl_order SET payment_id = ?, payment_status = ? WHERE order_id = ?";

    
//     db.query(query, [order.id, "PENDING", order_id], (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Database error", error: err });
//       }
      
//       res.status(200).json({ message: "Razorpay order created", order });
//     });
//   });
// };




exports.createRazorpayOrder = async (req, res) => {
  const { order_id, amount } = req.body;
  console.log(req.body)

  if (!order_id || !amount) {
    return res.status(400).json({ message: "Order ID and Amount are required" });
  }

  const options = {
    amount: amount * 100, // Amount in paisa
    currency: "INR",
    receipt: `receipt_${order_id}`,
    payment_capture: 1, // Auto capture after payment
  };

  try {
    // Create Razorpay order
    const order = await razorpayInstance.orders.create(options);
    console.log("djdj")
    console.log(order,"forn razerpay")

    // Save Razorpay order details to the database
    const query = "UPDATE tbl_order SET payment_id = ?, payment_status = ? WHERE order_id = ?";
    await db.queryPromise(query, [order.id, "PENDING", order_id]);

    // Return success response
    res.status(200).json({ message: "Razorpay order created", order });
  } catch (err) {
    if (err.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ message: "Database error", error: err.message });
    } else {
      return res.status(500).json({ message: "Razorpay error", error: err.message });
    }
  }
};


exports.verifyPayment = (req, res) => {
  console.log(req.body)
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    // Save payment details to the database
    const query =
      "INSERT INTO tbl_payment (transaction_id, order_id, payment_method, transaction_amount, payment_status, razorpay_payment_id, razorpay_order_id, payment_signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const transactionId = `TX_${Date.now()}`;
    const paymentStatus = "SUCCESS"; 
    const transactionAmount = 1000; 

    db.query(
      query,
      [
        transactionId,
        razorpay_order_id,
        "Razorpay",
        transactionAmount,
        paymentStatus,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        res
          .status(200)
          .json({
            message: "Payment successful",
            transaction_id: transactionId,
          });
      }
    );
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
};

exports.createRazorpayOrder = (req, res) => {
  const { order_id, amount } = req.body;

  if (!order_id || !amount) {
    return res
      .status(400)
      .json({ message: "Order ID and Amount are required" });
  }

  const options = {
    amount: amount * 100, // Amount in paisa
    currency: "INR",
    receipt: `receipt_${order_id}`,
    payment_capture: 1, // Auto capture after payment
  };

  razorpayInstance.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).json({ message: "Razorpay error", error: err });
    }

    // Save Razorpay order details
    const query =
      "UPDATE tbl_order SET payment_id = ?, payment_status = ? WHERE order_id = ?";
    db.query(query, [order.id, "PENDING", order_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Razorpay order created", order });
    });
  });
};


const { v4: uuidv4 } = require('uuid');



exports.checkOut = (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  const findCardQuery = "SELECT * FROM tbl_cart WHERE cid = ?";

  db.query(findCardQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No cart found" });
    }

    const findCardItems =
      `SELECT ci.*, p.productname, p.price
      FROM tbl_cart_items ci
      JOIN tbl_retailer_products p ON ci.pid = p.pid
      WHERE ci.cart_id = ?`;

    console.log(result, "cart");

    db.query(findCardItems, [result[0].cart_id], (err, cardItems) => {
      if (err) {
        console.error(err); // Log error
        return res.status(500).json({ message: "Database error", error: err });
      } else if (cardItems.length === 0) {
        return res.status(401).json({ message: "No cart items found" });
      } else {
        console.log(cardItems, "cartitems");

        const createOrderQuery =
          "INSERT INTO tbl_order (order_id , cid, total_amount) VALUES (?, ?, ?)";
        
        // Generate a unique order_id using UUID
        const order_id = uuidv4();
        const orderAmountcur = req.body.amount;

        const orderItemsData = cardItems.map((item) => [
          order_id,              // order_id (from tbl_order)
          item.pid,              // product ID
          item.quantity,         // quantity
          item.price,            // price
          uuidv4(),              // Generate a unique ID for order_item_id
        ]);
        console.log(orderItemsData,"orderItemsData")

        db.query(
          createOrderQuery,
          [order_id, id, orderAmountcur],
          (err, result) => {
            if (err) {
              console.error(err); // Log error
              return res
                .status(500)
                .json({ message: "Database error", error: err });
            }

            // If no result returned, something went wrong in order creation
            if (result.affectedRows === 0) {
              return res.status(401).json({ message: "Failed to create order" });
            }

            console.log("Order created with ID:", order_id);
            console.log(result)
            

            // Now insert order items into tbl_order_items
            const addOrderItemsQuery =
              "INSERT INTO tbl_order_items (order_id , pid, quantity, price,order_item_id) VALUES ?";


            // Prepare data for insertion in tbl_order_items


            console.log(orderItemsData)

            db.query(addOrderItemsQuery, [orderItemsData], (err, result) => {
              if (err) {
                console.error("Error inserting order items:", err);
                return res.status(500).json({ message: "Database error", error: err });
              }

              console.log("Order items inserted:", result);

              // Now integrate Razorpay payment
              const { amount } = req.body;
              console.log("first")

              const options = {
                amount: amount * 100, // Amount in paisa
                currency: "INR",
                order_id: order_id,
                payment_capture: 1, // Auto capture after payment
              };

              res.status(200).json({ message: "Razorpay order created", order: options });

              // razorpayInstance.orders.create(options, (err, order) => {
              //   if (err) {
              //     return res.status(500).json({ message: "Razorpay error", error: err });
              //   }
              //   console.log("enter")

              //   // Save Razorpay order details
              //   const updateOrderQuery =
              //     "UPDATE tbl_order SET payment_id = ?, payment_status = ? WHERE order_id = ?";


              //   db.query(updateOrderQuery, [order.id, "PENDING", order_id], (err, result) => {
              //     if (err) {
              //       return res.status(500).json({ message: "Database error", error: err });
              //     }
              //     const options = {
              //       amount: amount * 100, // Amount in paisa
              //       currency: "INR",
              //       order_id: order_id,
              //       payment_capture: 1, // Auto capture after payment
              //     };

              //     // Respond with Razorpay order details
              //     res.status(200).json({ message: "Razorpay order created", order });
              //   });
              // });
            });
          }
        );
      }
    });
  });
};