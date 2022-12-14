const Response = require('../entities/response.entity');

exports.enqueue = async (tasks, queueSize) => {
  const result = await execute(tasks, queueSize);
  return result;
}

execute = async (tasks, queueSize) => {
  const response = new Response();
  var processed = [];
  var rounds = Math.ceil(tasks.length / queueSize);

  for (let r = 0; r < rounds; r++){
    var partial = tasks.slice(r * queueSize, (r * queueSize) + queueSize);
    const results = await Promise.all([...partial]).then(result => {
      return result;
    })
      .catch(error => {
        response.setError(error)
        return response;
      })

    processed = [...processed, ...results]
  }

  return processed;
}


delay = (milliseconds) => new Promise((resolves) => {
  setTimeout(() => { resolves()}, milliseconds);
})