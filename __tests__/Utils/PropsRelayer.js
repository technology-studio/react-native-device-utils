/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-01-14T17:02:17+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import * as React from 'react'

const PropsContext = React.createContext()

type Props = {|
  props: Object,
  children: React.Node,
|}

export class PropsProvider extends React.PureComponent<Props> {
  render () {
    return (
      <PropsContext.Provider value={this.props.props}>
        {this.props.children}
      </PropsContext.Provider>
    )
  }
}

export const connectPropsRelayer = (WrappedComponent) => {
  class PropsRelayer extends React.Component {
    static contextType = PropsContext
    render () {
      return (
        <WrappedComponent
          { ...this.props }
          { ...this.context }
        />
      )
    }
  }

  return PropsRelayer
}
