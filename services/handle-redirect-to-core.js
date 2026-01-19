const { default: axios } = require('axios');
const { CORE_BASE_URL } = require('./constants');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function handleRedirectToCore(req, res) {
  const { intentActionId } = req.params;

  try {
    const response = await axios.post(
      `${CORE_BASE_URL}/intent-verifications/${intentActionId}`,
      req.body
    );

    const { return_url, status, reference, requires_action, next_action } =
      response.data.data;

    let redirectURL;
    if (requires_action && next_action.url) {
      redirectURL = next_action.url;
    } else {
      const urlParams = new URLSearchParams();
      urlParams.append('reference', reference);
      urlParams.append('status', status);

      redirectURL = `${return_url}?${urlParams}`;
    }

    res.redirect(redirectURL);
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message;
    res.render('app-error', {
      title: 'Error',
      errorHeading: 'Error Loading Session',
      errorMessage:
        message ||
        'An error occurred while loading the payment page. Please try again.',
    });
  }
}

module.exports = handleRedirectToCore;
