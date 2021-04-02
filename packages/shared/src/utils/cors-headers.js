export const getCorsHeaders = () => {
  return {
    'Access-Control-Allow-Origin': '*', // better restrict this on a per-stage basis, get from env variable, Secrets Manager, etc...
    'Access-Control-Allow-Credentials': true,
  };
};
