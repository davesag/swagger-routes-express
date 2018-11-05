const substituteVariables = (str, variables) => {
  let result = Buffer.from(str).toString()
  Object.keys(variables).forEach(variable => {
    const pattern = new RegExp(`{${variable}}`, 'g')
    result = result.replace(pattern, variables[variable])
  })
  return result
}

module.exports = substituteVariables
