/**
 * --------------------------------------------------------------------------
 * Bootstrap Form Gallery (v0.0.1): form-gallery.js
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

 const NAME               = 'formgallery'
 const VERSION            = '0.0.1'
 const DATA_KEY           = 'bs.formgallery'
 const EVENT_KEY          = `.${DATA_KEY}`
 const DATA_API_KEY       = '.data-api'
 const JQUERY_NO_CONFLICT = $.fn[NAME]
 
 const Default = {
    imagePicker     : cb => cb(prompt('Image URL')),
    imagePreviewer  : true
}

const DefaultType = {
  imagePicker       : '(function|string)',
  imagePreviewer    : '(function|string|boolean)'
}

const Event = {
    ADD                 : `add${EVENT_KEY}`,
    ADDED               : `added${EVENT_KEY}`,
    CHANGE              : `change${EVENT_KEY}`,
    CLEAR               : `clear${EVENT_KEY}`,
    CLEARED             : `cleared${EVENT_KEY}`,
    DELETE              : `delete${EVENT_KEY}`,
    DELETED             : `deleted${EVENT_KEY}`,

    CHANGE_DATA_API     : `change${EVENT_KEY}`,
    CLICK_DATA_API      : `click${EVENT_KEY}`,
}

const ClassName = {
    ACTION          : 'formgallery-action',
    CONTAINER       : 'formgallery',
    IMAGE           : 'formgallery-image',
    LIST            : 'formgallery-list',
    REMOVER         : 'formgallery-remove',
}

const Selector = {
    ADDER           : `.${ClassName.ACTION}`,
    CONTAINER       : `.${ClassName.CONTAINER}`,
    IMAGE           : `.${ClassName.IMAGE}`,
    LIST            : `.${ClassName.LIST}`,
    REMOVER         : `.${ClassName.REMOVER}`,
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class FormGallery {
    constructor(element, config) {
        this._config    = this._getConfig(config)
        this._element   = element
        this._list      = $(element).children(Selector.LIST).get(0)
        this._model     = document.querySelector(this._element.dataset.model)

        this._updateValue()

        if(typeof this._config.imagePicker === 'string')
            this._config.imagePicker = window[this._config.imagePicker]

        this._addModelListener()
    }


    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }


    // Public

    addImage(url){
        $(this._element).trigger(Event.ADD, url)
        this._value.push(url)
        this._model.value = JSON.stringify(this._value)

        this._drawItem(url)
        $(this._element).trigger(Event.ADDED, url)
        $(this._element).trigger(Event.CHANGE)
    }
    
    clear(){
        $(this._element).trigger(Event.CLEAR)

        this._model.value     = '[]'
        this._value           = []
        this._list.innerHTML  = ''

        $(this._element).trigger(Event.CLEARED)
        $(this._element).trigger(Event.CHANGE)
    }
    
    preview(index){
        if(typeof this._config.imagePreviewer === 'boolean')
            return

        this._config.imagePreviewer(this._value, index)
    }
    
    pick(){
        if(!this._config.imagePicker)
            return
        this._config.imagePicker(res => {
            if(res)
                this.addImage(res)
        }, this)
    }

    remove(index){
        let item = this._value[index]
        if(!item)
            return

        $(this._element).trigger(Event.DELETE, item)
        this._value.splice(index, 1)
        this._model.value = JSON.stringify(this._value)

        let itemEl = $(this._list).children()[index]
        itemEl.classList.add(ClassName.HIDE)

        $(itemEl).remove()

        $(this._element).trigger(Event.DELETED, item)
        $(this._element).trigger(Event.CHANGE)
    }


    // Private

    _addModelListener(){
        $(this._model).on(Event.CHANGE_DATA_API, e => {
            this._updateValue()
            this._drawItems()
            $(this._element).trigger(Event.CHANGE)
        })
    }

    _drawItem(item){
        let tmpl = `
            <div class="formgallery-item">
                <button type="button" class="close formgallery-remove" aria-label="Close" title="Remove">
                    <span aria-hidden="true">×</span>
                </button>
                <a href="#" class="formgallery-image" style="background-image: url('${item}')"></a>
            </div>`

        $(tmpl).appendTo(this._list)
    }

    _drawItems(){
        this._list.innerHTML = ''
        this._value.forEach(e => this._drawItem(e))
    }

    _getConfig(config) {
        config = {
          ...Default,
          ...config
        }
        Util.typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    _updateValue(){
        let val = this._model.value.trim()
        this._value = []

        if(!val)
            return

        try{
            this._value = JSON.parse(val)
        }catch{
            console.error('The model value is not valid JSON', this._model)
        }

        if(!Array.isArray(this._value)){
            console.error('The model value is not valid JSON Array', this._model)
            this._value = []
        }
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            let data = $(this).data(DATA_KEY)
            const _config = {
                ...Default,
                ...$(this).data(),
                ...typeof config === 'object' && config ? config : {}
            }

            if (!data) {
                data = new FormGallery(this, _config)
                $(this).data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`)
                }
                data[config](relatedTarget)
            }
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */
$(document).on(Event.CLICK_DATA_API, Selector.REMOVER, function (event) {
    let target = this.parentNode
    
    if (this.tagName === 'A' || this.tagName === 'AREA')
        event.preventDefault()

    FormGallery._jQueryInterface.call($(target.parentNode.parentNode), 'remove', $(target).index())
})

$(document).on(Event.CLICK_DATA_API, Selector.IMAGE, function (event) {
    let target = this.parentNode

    if (this.tagName === 'A' || this.tagName === 'AREA')
        event.preventDefault()

    FormGallery._jQueryInterface.call($(target.parentNode.parentNode), 'preview', $(target).index())
})

$(document).on(Event.CLICK_DATA_API, Selector.ADDER, function (event) {
    let target = this.parentNode

    if (this.tagName === 'A' || this.tagName === 'AREA')
        event.preventDefault()

    FormGallery._jQueryInterface.call($(target), 'pick', target)
})

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = FormGallery._jQueryInterface
$.fn[NAME].Constructor = FormGallery
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return FormGallery._jQueryInterface
}

export default FormGallery