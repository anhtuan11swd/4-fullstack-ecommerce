import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createNewCoupon = async (userId) => {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: `BONUS${Date.now()}`,
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId,
  });

  await newCoupon.save();
  return newCoupon;
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price);
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            images: [product.image],
            name: product.name,
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        userId: req.user._id,
      });

      if (coupon) {
        totalAmount -= Math.round(
          totalAmount * (coupon.discountPercentage / 100),
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      line_items: lineItems,
      metadata: {
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            _id: p._id,
            image: p.image,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
          })),
        ),
        userId: req.user._id.toString(),
      },
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (totalAmount >= 5000000) {
      await createNewCoupon(req.user._id);
    }

    res.json({ id: session.id });
  } catch (error) {
    console.error("Lỗi tạo checkout session:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Thanh toán chưa hoàn tất" });
    }

    if (session.metadata.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: session.metadata.couponCode },
        { isActive: false },
      );
    }

    const products = JSON.parse(session.metadata.products);

    const newOrder = new Order({
      products: products.map((p) => ({
        price: p.price,
        product: p._id,
        quantity: p.quantity,
      })),
      stripeSessionId: session.id,
      totalAmount: session.amount_total,
      user: session.metadata.userId,
    });

    await newOrder.save();

    await Coupon.findOneAndDelete({ userId: session.metadata.userId });

    if (session.amount_total >= 5000000) {
      await createNewCoupon(session.metadata.userId);
    }

    res.json({ message: "Thanh toán thành công", success: true });
  } catch (error) {
    console.error("Lỗi xử lý thanh toán thành công:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
