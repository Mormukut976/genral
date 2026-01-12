exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { name, email, cardNumber } = data;
    
    // Log the payment attempt (in real app, you would process payment here)
    console.log(`Payment attempt - Name: ${name}, Email: ${email}, Card: ${cardNumber}`);
    
    // Check if card number is the special one
    const cleanCardNumber = cardNumber.replace(/\s+/g, '');
    
    if (cleanCardNumber === '255025502750') {
      // Simulate successful payment processing
      // In real app, connect to payment gateway here
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Payment successful! Course materials will be delivered to your email within 48 hours.',
          courseAccess: 'granted',
          deliveryTime: '48 hours',
          email: email
        })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Payment failed. Please use the specified card number for this special offer.',
          errorCode: 'INVALID_CARD'
        })
      };
    }
    
  } catch (error) {
    console.error('Payment processing error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Server error occurred. Please try again.'
      })
    };
  }
};
