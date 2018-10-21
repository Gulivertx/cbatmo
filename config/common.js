const env = require('./env.json');
const pjson = require('../package.json');

exports.config = () => {
    const node_env = process.env.NODE_ENV || 'development';
    return env[node_env];
};

exports.info = () => {
    let keywords = '';

    pjson.keywords.map((keyword, index) => keywords += index !== 0 ? `, ${keyword}` : keyword);

    return {
        name: pjson.name,
        version: pjson.version,
        description: pjson.description,
        author: pjson.author,
        keywords: keywords
    };
};
