const { default: axios } = require('axios');
const getBEURL = require('./get-be-urls');

async function postPaymentSession(req, res) {
  const { ref } = req.params;

  try {
    const API_BASE_URL = getBEURL({ req, key: 'API_BASE_URL' });

    const response = await axios.patch(
      `${API_BASE_URL}/payments/${ref}/sessions`,
      { threeds_result: req.body.cres }
    );

    const { redirect_url, current_step, failure_reason } = response.data.data;

    res.render('post-payment-session', {
      currentStep: current_step,
      redirectURL: redirect_url,
      failureReason: failure_reason,
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
