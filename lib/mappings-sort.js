const sortMappings = (mappings) => {
  let sortedMappings = new Map([...mappings.entries()].sort((a, b) => {
    let order = -1;
    if (a[1].request && a[1].request.priority && b[1].request && b[1].request.priority) {
      order = a[1].request.priority - b[1].request.priority;
    } else if (b[1].request && b[1].request.priority) {
      order = 1;
    }
    return order;
  }));
  return sortedMappings;
}

module.exports = sortMappings;