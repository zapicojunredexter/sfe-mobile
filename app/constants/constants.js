const env = 'production';

const config = {
    development: {
        api_url: 'https://us-central1-streetfood-express.cloudfunctions.net/api',
    },
    production: {
        api_url: 'https://us-central1-streetfood-express.cloudfunctions.net/api',
    },
};

export default config[env];