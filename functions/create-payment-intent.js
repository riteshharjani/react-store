// domain/.netlify/functions/hello

// if .env file is in root then this will load it.
require("dotenv").config()

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY)


exports.handler = async function (event, context) {
	// console.log(event, context);
	if (event.body) {
		const {cart, shipping_fee, total_amount} = JSON.parse(event.body);
		//console.log(cart);

		// normally this is done in your backend server which you trust to check
		// if the total items and order is matching
		const calculateOrderAmount = () => {
			return shipping_fee + total_amount;
		}

		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(),
				currency: "INR",
			});
			return {
				statusCode: 200,
				body: JSON.stringify({clientSecret: paymentIntent.client_secret}),
			}

		} catch (err) {
			/* handle error */
			return {
				statusCode: 500,
				body: JSON.stringify({msg: err.message}),
			}
		}
	}
	return {
		statusCode: 200,
		body: "Check your functions",
	}
}
