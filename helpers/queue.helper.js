exports.enqueue = async (tasks, queueSize) => {
  const response = await execute(tasks, queueSize);
  return response;
}

execute = async (tasks, queueSize) => {
  var processed = [];
  var rounds = Math.ceil(tasks.length / queueSize);

  for (let r = 0; r < rounds; r++){
    var partial = tasks.slice(r * queueSize, (r * queueSize) + queueSize);
    const results = await Promise.all([...partial]).then(result => {
      return result;
    }).catch(err =>
      console.log(err)
    )

    processed = [...processed, ...results]
  }

  return processed;
}


delay = (milliseconds) => new Promise((resolves) => {
  setTimeout(() => { resolves()}, milliseconds);
})