import React from 'react'
import {getTeamNames} from "../utils/api";
import Sidebar from "./Sidebar";
import TeamLogo from "./TeamLogo";
import Team from "./Team";
import { Route, Link } from 'react-router-dom'
import Loading from "./Loading";

class Teams extends React.Component {
    state = {
        teamNames: [],
        loading: true,
    }

    componentDidMount(){
        getTeamNames().then((names) => this.setState(() => ({
            teamNames: names,
            loading: false,
        })))
    }

    render() {

        const {loading, teamNames} = this.state
        const {match, location} = this.props

        return (
            <div className='container two-column'>
                <Sidebar title='Team' list={teamNames} loading={loading} {...this.props}/>
                {this.state.loading === false && this.props.location.pathname ==='/teams'
                    ? <div className="sidebar-instruction">Select a Team</div>
                    : null
                }

                <Route path={`${match.url}/:teamId`} render={({match}) => {
                    return (
                    <div className="panel">
                        <Team id={match.params.teamId} >
                            { (team) => team === null
                                ? <Loading text='loading' />
                                : <div style= {{width: '100%'}} >
                                    <TeamLogo id={team.id} className='center' />
                                    <h1 className="medium-header">{team.name}</h1>
                                    <ul className="info-list row">
                                        <li>
                                            Established
                                            <div>
                                                {team.established}
                                            </div>
                                        </li>
                                        <li>
                                            Manager
                                            <div>
                                                {team.manager}
                                            </div>
                                        </li>
                                        <li>
                                            Coach
                                            <div>
                                                {team.coach}
                                            </div>
                                        </li>
                                    </ul>
                                    <Link
                                        to={`/${match.params.teamId}`}
                                        className='center btn-main'
                                    >
                                        {team.name} Team Page
                                    </Link>
                                </div>
                            }
                        </Team>
                    </div>
                )
                }}
                />


            </div>

        )
    }
}

export default Teams