'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Bootstrap Form Gallery v0.0.1 (https://iqbalfn.github.io/bootstrap-form-gallery/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/iqbalfn/bootstrap-form-gallery/blob/master/LICENSE)
  */`
}

module.exports = getBanner
