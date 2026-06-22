const BFF = "http://feodorius-bff-api-prod.eu-north-1.elasticbeanstalk.com";

const API_PATHS = {
  product: `${BFF}/product`,
  order: `${BFF}/cart`,
  import: "https://wsh6kss9u5.execute-api.eu-north-1.amazonaws.com/prod",
  bff: BFF,
  cart: `${BFF}/cart`,
};

export default API_PATHS;
