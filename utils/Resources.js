import { Howl } from 'howler'

export default class Resources {
  constructor(sources, store, window) {
    this.store = store
    this.sources = sources

    this.items = this.audios = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.customEventResourcesReady = new window.CustomEvent('resourcesIsReady')

    this.startLoading()
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'audio') {
        const file = new Howl({
          src: [source.path],
          ...source.options,
          onload: () => {
            this.audios[source.name] = file
            this.sourceLoaded(source, file)
          },
        })
        file.name = source.name
      }
    }
  }

  sourceLoaded(source, file) {
    if (source.options && source.type === 'texture') {
      for (const [key, value] of Object.entries(source.options)) {
        file[key] = value
      }
    }

    this.items[source.name] = file

    this.loaded++

    this.store.dispatch('setPercentLoaded', { percent: this.progressRatio })

    if (this.loaded === this.toLoad) {
      window.dispatchEvent(this.customEventResourcesReady)
      this.store.dispatch('setResources', {
        resources: Object.values(this.audios),
      })
      setTimeout(
        () => this.store.dispatch('setLoading', { loading: false }),
        2400
      )
    }
  }

  get progressRatio() {
    return this.loaded / this.toLoad
  }
}
