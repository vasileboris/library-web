export default {
    parse: function (properties) {
        return properties.split('\n')
            .filter(line => '' !== line.trim())
            .map(line => line.split('='))
            .map(tokens => ({
                [tokens[0]]: tokens[1]
            }))
            .reduce((properties, property) => ({
                ...properties,
                ...property
            }), {})
    }
};

