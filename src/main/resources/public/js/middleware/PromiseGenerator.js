export function run(taskDef, ...params) {
    let task = taskDef(...params);

    nextStep(task.next());

    function nextStep(result) {
        if(!result.done) {
            result.value
                .then(response => nextStep(task.next(response ? response.data : undefined)))
                .catch(error => task.throw(error))
        }
    }

}
