function getVariable(key) {
  return import.meta.env[key];
}

export { getVariable };
