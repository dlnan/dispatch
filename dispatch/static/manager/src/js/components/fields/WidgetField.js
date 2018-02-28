import React from 'react'
import R from 'ramda'

import WidgetSelectInput from '../inputs/selects/WidgetSelectInput'

import FieldGroup from './FieldGroup'

export default class WidgetFieldComponent extends React.Component {
  handleWidgetChange(widgetId) {
    if (!widgetId) {
      // Set data to null when removing widget
      this.props.onChange(null)
    } else {
      console.log('changing', {
        id: widgetId,
        data: {}
      })
      this.props.onChange({
        id: widgetId,
        data: {}
      })
    }
  }

  updateField(name, data) {
    const widgetData = {}
    widgetData[name] = data

    this.props.onChange(R.merge(this.props.data, {
      data: R.merge(this.props.data.data || {}, widgetData)
    }))
  }

  getWidgetId() {
    return this.props.data.id || null
  }

  getWidget() {
    const id = this.getWidgetId()
    return R.path(['widgets', id], this.props.field)
  }

  getWidgetData() {
    return this.props.data.data || {}
  }

  render() {
    const widget = this.getWidget()
    const widgetData = this.getWidgetData()

    const fields = widget ? (
      <FieldGroup
        title={`Edit ${this.props.field.label}`}
        name={`widget-field__${this.props.field.name}__${widget.id}`}
        fields={widget.fields || []}
        data={widgetData}
        errors={this.props.errors || {}}
        onChange={(name, data) => this.updateField(name, data)} />
    ) : null

    console.log('ID', this.getWidgetId())

    return (
      <div>
        <div className='c-input--widget-field__select-wrapper'>
          <WidgetSelectInput
            compatibleWidgets={this.props.field.widgets}
            selected={this.getWidgetId()}
            update={widgetId => this.handleWidgetChange(widgetId)} />
        </div>
      {fields}
      </div>
    )
  }
}

WidgetFieldComponent.defaultProps = {
  data: {},
  field: {}
}
