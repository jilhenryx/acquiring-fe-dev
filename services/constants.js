const { API_BASE_URL, CORE_BASE_URL, API_BASE_URL_PROD, CORE_BASE_URL_PROD } =
  process.env;

module.exports = {
  DEV: {
    API_BASE_URL,
    CORE_BASE_URL,
  },
  PROD: {
    API_BASE_URL: API_BASE_URL_PROD,
    CORE_BASE_URL: CORE_BASE_URL_PROD,
  },
};
