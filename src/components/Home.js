import React from 'react'
import TeamLogo from "./TeamLogo";
import {Link } from 'react-router-dom'
import {getTeamNames} from "../utils/api";

class Home extends React.Component {
    state = {
        teamNames: []
    }

    componentDidMount() {
        getTeamNames()
            .then((names) => this.setState(() => ({
                teamNames: names,
            })))
    }

    render() {
        return (
            <div className='container '>
                <h1 className="larger-header text-center">
                    LEAGUE
                </h1>
                <h3 className='header text-center'>
                    Selector a team
                </h3>
                <div className='home-grid' style={{justifyContent:'space-around'}} >
                    {this.state.teamNames.map((id) => (
                        <Link key={id} to={`/${id}`} >
                            <TeamLogo id={id} width='125px'/>
                            </Link>
                        ))}
                </div>

            </div>

        )
    }
}

export default Home