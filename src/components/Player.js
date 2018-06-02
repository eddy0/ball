import React from 'react'
import { Route, Link } from 'react-router-dom'
import slug from 'slug'
import {getPlayers} from "../utils/api";
import {parse} from 'query-string'
import Sidebar from "./Sidebar";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class Player extends React.Component {
    state = {
        players: [],
        loading: true,
    }

    fetchPlayers = (teamId) => {
        getPlayers(teamId).
        then((players) => this.setState(() => ({
            players: players,
            loading: false,
        }))
        )
    }

    componentDidMount() {
        const {location} = this.props
        location.search
        ? this.fetchPlayers(parse(location.search).teamId) : this.fetchPlayers()

    }

    render() {

        console.log(this.props)
        const list = this.state.players.map((player) => player.name)
        return (
            <div className='container two-column'>
                <Sidebar title='Players'
                         list={list}
                         loading={this.state.loading}
                         {...this.props}
                />

                {this.state.loading === false && this.props.location.pathname ==='/players'
                    ? <div className="sidebar-instruction">Select a Player</div>
                    : null
                }

                <Route path={`${this.props.match.url}/:playerId`} render={({match}) => {
                    if (this.state.loading === true) {
                        return null
                    }
                    const {name, position, teamId, number, avatar, apg, ppg, rpg, spg,} = this.state.players.find((player) => slug(player.name) === match.params.playerId )
                    return (
                        <TransitionGroup className='panel'>
                            <CSSTransition key={this.props.location.key} timeout={250} classNames='fade'>

                        <div className="panel text-center">
                            <img src={`${avatar}`} alt="" className="avatar"/>
                            <h1 className="medium-header">{name}</h1>
                            <h3 className="header text-center">{number}</h3>
                            <div className="row">
                                <ul className="info-list" style={{marginRight: 80}}>
                                    <li>
                                        Team
                                        <div>
                                            <Link to={`/${teamId}`} style={{color:'#68809a'}} >{teamId}</Link>
                                        </div>
                                    </li>
                                    <li>
                                        Position
                                        <div>
                                           {position}
                                        </div>
                                    </li>
                                    <li>
                                        PPG
                                        <div>
                                            {ppg}
                                        </div>
                                    </li>
                                </ul>
                                <ul className="info-list">
                                    <li>
                                        APG
                                        <div>
                                            {apg}
                                        </div>
                                    </li>
                                    <li>
                                        SPG
                                        <div>
                                            {spg}
                                        </div>
                                    </li>
                                    <li>
                                        RPG
                                        <div>
                                            {rpg}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                            </CSSTransition>
                        </TransitionGroup>
                    )
                }}/>

            </div>



        )
    }
}

export default Player