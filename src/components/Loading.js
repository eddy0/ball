import React from 'react'
import PropTypes from 'prop-types'

class Loading extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    state={
        text: this.props.text
    }

    componentDidMount() {
        let loading = this.state.text + '...'
        this.interval = window.setInterval(() => {
            if (this.state.text === loading) {
                this.setState(() => ({
                    text: this.props.text,
                }))
            } else {
                this.setState((prev) => ({
                    text: prev.text + '.',
                }))
            }
        }, 300)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)

    }

    render() {
        return (
            <div className='container center'>
                <h2 className='text-center'>
                    {this.state.text}
                </h2>

            </div>
        )
    }
}

export default Loading