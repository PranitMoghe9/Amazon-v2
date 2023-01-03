const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// we can expose this as this backend and displayed to users browser or frontend

export default async (req, res) => {
  const { items, email } = req.body;
  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }));
  //implicit return
  //taking each item and transforming it the form that stripe wants

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [{ shipping_rate: "shr_1MLX9mSH7LNa0rUv69HqYVou" }],
    line_items: transformedItems,
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "IN"],
    },
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
};

//anything under api folder only in backend code
//not in api but in pages is frontend code
