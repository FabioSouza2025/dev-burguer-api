import "dotenv/config";

import * as Yup from "yup";
import Stripe from "stripe";

import Product from "../../models/Products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (products, items) => {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return items.reduce((total, item) => {
    const product = productsById.get(item.id);

    return total + product.price * item.quantity;
  }, 0);
};

class CreatePaymentIntentController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().integer().positive().required(),
            quantity: Yup.number().integer().positive().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    const { products } = request.body;
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey || stripeKey === "your_stripe_secret_here") {
      return response.status(503).json({
        error: "Payment service is not configured",
      });
    }

    const productIds = products.map((product) => product.id);
    const databaseProducts = await Product.findAll({
      where: { id: productIds },
      attributes: ["id", "price"],
    });

    if (databaseProducts.length !== new Set(productIds).size) {
      return response.status(400).json({ error: "Invalid product" });
    }

    const amount = calculateOrderAmount(databaseProducts, products);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "brl",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return response.json({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment methods/review/transaction_id${paymentIntent.id}`,
      });
    } catch (_error) {
      return response.status(502).json({ error: "Payment service unavailable" });
    }
  }
}

export default new CreatePaymentIntentController();
