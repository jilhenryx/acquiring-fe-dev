const { default: axios } = require('axios');
const getBEURL = require('./get-be-urls');

async function getPaymentSession(req, res) {
  const { ref } = req.params;

  try {
    const API_BASE_URL = getBEURL({ req, key: 'API_BASE_URL' });

    const response = await axios.get(
      `${API_BASE_URL}/payments/${ref}/sessions`
    );

    const { session_data, current_step } = response.data.data;

    res.render('get-payment-session', {
      title: 'Redirecting to payment...',
      paymentRef: ref,
      providerOrigin: session_data?.post_message_allowed_origins?.[0],
      apiBaseURL: API_BASE_URL,
      currentStep: current_step,
      formAction: session_data?.form_action,
      formMethod: session_data?.form_method,
      formFields: session_data?.form_fields,
      formFieldUrl: session_data?.form_fields
        .map((el) => `${el.name.toLowerCase()}=${el.value}`)
        .join('&'),
    });
  } catch (error) {
    console.log(error);
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

module.exports = getPaymentSession;
