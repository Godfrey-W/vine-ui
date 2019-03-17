const requireAll = requireContext => requireContext.keys().map(requireContext)

// import all svg
const req = require.context('../assets/svg', true, /\.svg$/)
requireAll(req)
