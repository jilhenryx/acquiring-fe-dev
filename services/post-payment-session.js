const { default: axios } = require('axios');
const { API_BASE_URL } = require('./constants');

async function postPaymentSession(req, res) {
  const { ref } = req.params;

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/payments/${ref}/sessions`,
      req.body
    );

    const { redirect_url, current_step } = response.data.data;

    res.render('post-payment-session', {
      currentStep: current_step,
      redirectURL: redirect_url,
    });
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message;
    res.render('app-error', {
      title: 'Error',
      errorHeading: 'Error Loading Session',
      errorMessage:
        message ||
        'An error occurred while loading the authentication page. Please try again.',
    });
  }
}

module.exports = postPaymentSession;
