export function run(generator, ...params) {
    const iterator = generator(...params);

    iterate(iterator.next());

    function iterate(result) {
        if(!result.done) {
            const promise = result.value;
            promise
                .then(response => iterate(iterator.next(response ? response.data : undefined)))
                .catch(error => iterator.throw(error));
        }
    }

}
