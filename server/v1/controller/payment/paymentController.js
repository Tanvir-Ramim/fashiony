const appError = require("http-errors");
const SSLCommerzPayment = require("sslcommerz-lts");
const { ObjectId } = require("mongodb");
const { Order } = require("../../../model/order/orderModel");
const { smsConfirmation } = require("../../../utils/orderMail");
const { Product } = require("../../../model/product/productModel");
const { Shipping } = require("../../../model/shipping/shipModel");
const { default: mongoose } = require("mongoose");
const back_url = process.env.SERVER_URL;
const front_url = process.env.CLIENT_URL;
const API = process.env.BASE_URL_V1;
// request
const sslOrder = async (req, res) => {
  try {
    const { _id } = req.params;
    const { amount } = req.query;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const tran_id = new mongoose.Types.ObjectId().toString();
    const sslOrder = await Order.findById(_id);
    if (!sslOrder) {
      return next(appError(404, "Order Not created"));
    }

    // data set
    const dataa = {
      total_amount: Math.floor(Number(amount)),
      currency: "BDT",
      tran_id: tran_id,
      success_url: `${back_url}${API}/payment/success/${tran_id}?amount=${amount}`,
      fail_url: `${back_url}${API}/payment/fail/${tran_id}`,
      cancel_url: `${back_url}${API}/payment/cancel/${tran_id}`,
      shipping_method: "No",
      product_name: "Customer Order",
      product_category: "Shopping",
      product_profile: "general",
      is_sent_email: "yes",
      cus_name: sslOrder.customer_name,
      cus_email: sslOrder.customer_eamil,
      cus_add1: sslOrder.city,
      cus_add2: sslOrder.address,
      cus_phone: sslOrder.customer_phone,
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
      ipn_url: `${back_url}${API}/ssl-payment/notification/${tran_id}`,
    };
    // initalr
    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID_SSL,
      process.env.STORE_PASSWORD,
      false
    );
    // console.log("sslcommerz", sslcommerz);
    await sslcommerz.init(dataa).then(async (data) => {
      if (data?.GatewayPageURL) {
        const mx = await Order.findByIdAndUpdate(
          { _id: _id },
          { $set: { tran_id: tran_id } },
          { new: true }
        );

        res.status(200).json({ url: data?.GatewayPageURL });
      } else {
        res.status(400).json({
          message: "Payment does not success,Check your info",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, messagae: error.message });
  }
};

// success
const sslSuccess = async (req, res) => {
  const { tran_id } = req.params;
  const { amount } = req.query;

  try {
    const shippingInfo = await Shipping.findById("66d6901edd7ae94ed1d08436");

    let lib = {};
    if (
      Number(amount) === shippingInfo.out_dhaka ||
      Number(amount) === shippingInfo.in_dhaka
    ) {
      (lib.oder_status = "Order Confirmed"),
        (lib.payment_status = "Delivery Fee Paid"),
        (lib.payment_by = "Cash On Delivery"),
        (lib.payment_institute = "SSL-Commerz");
    } else {
      //

      (lib.oder_status = "Order Confirmed"),
        (lib.payment_status = "Payment Full"),
        (lib.payment_by = "Online Banking"),
        (lib.payment_institute = "SSL-Commerz");
    }
    lib.paid_amount = Number(amount);
    const mx = await Order.findOneAndUpdate(
      { tran_id: tran_id },
      {
        $set: lib,
      },
      { new: true }
    );

    if (!mx) {
      return res.redirect(`${front_url}/payment/fail/${tran_id}`);
    }

    // update product and user
    for (const { p_ref, quantity } of mx.product_list) {
      await Product.findByIdAndUpdate(
        p_ref,
        {
          $inc: { stock: -quantity },
        },
        { new: true }
      );
    }


    // ****************** sms ****
    await smsConfirmation(mx.email, mx);
    await smsConfirmation(process.env.EMAIL, mx);
    return res.redirect(`${front_url}/payment/success/${mx._id}`);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server Error", reason: error.message });
  }
};
// fail ssl
const sslfail = async (req, res) => {
  const { tran_id } = req.params;

  await Order.findOneAndUpdate(
    { tran_id: tran_id },
    {
      $set: {
        tran_id: "",
        payment_status: "Failed",
      },
    },
    { new: true }
  );
 
  return res.redirect(`${front_url}/payment/fail/${tran_id}`);
};

// cancel ssl
const sslCancel = async (req, res) => {
  const { tran_id } = req.params;
  console.log(tran_id);
  await Order.findOneAndUpdate(
    { tran_id: tran_id },
    {
      $set: {
        tran_id: "",
        payment_status: "Order Canceled",
      },
    },
    { new: true }
  );

  return res.redirect(`${front_url}/payment/fail/${tran_id}`);
};

module.exports = { sslOrder, sslSuccess, sslfail, sslCancel };
