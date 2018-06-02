import React from 'react'

class DynamicImport extends React.Component {

    state={
        component: null
    }

    componentDidMount() {
        this.props.load()
            .then((mod) => this.setState(()=>({
                component: mod.default,
            })))
    }

    render() {
        return this.props.children(this.state.component)
    }
}

export default DynamicImport