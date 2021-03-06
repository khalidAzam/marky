import perf from './performance'

let nowForNode

if (!process.browser) {
  // implementation borrowed from:
  // https://github.com/myrne/performance-now/blob/6223a0d544bae1d5578dd7431f78b4ec7d65b15c/src/performance-now.coffee
  let hrtime = process.hrtime
  let getNanoSeconds = () => {
    let hr = hrtime()
    return hr[0] * 1e9 + hr[1]
  }
  let loadTime = getNanoSeconds()
  nowForNode = () => ((getNanoSeconds() - loadTime) / 1e6)
}

export default process.browser
  ? perf && perf.now ? () => perf.now() : () => Date.now()
  : nowForNode
