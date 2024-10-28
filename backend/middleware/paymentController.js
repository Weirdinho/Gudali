const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const { token, amount } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token.id,
            description: 'Cow Rearing Course Payment',
        });

        res.json({ success: true, charge });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Payment failed' });
    }
};
