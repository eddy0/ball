import React from 'react'
import PropTypes from 'prop-types'
import {getTeam} from "../utils/api";


class Team extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }

    state = {
        team: null,
    }

    fetchTeam = (id) => {
        this.setState(() => ({
            team: null
        }))

        getTeam(id).then((team) => this.setState(() => ({
            team: team,
        })))
    }

    componentDidUpdate  (prev, prevState) {
        if (this.props.id !== prev.id) {
            this.fetchTeam(this.props.id)
        }
    }

    componentDidMount() {
        this.fetchTeam(this.props.id)
    }

    render() {
        return this.props.children(this.state.team)

    }
}

export default Team