import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import {getTeamNames, getTeamsArticles} from "../utils/api";
import  slug from 'slug'
import Team from "./Team";
import TeamLogo from "./TeamLogo";
import Loading from "./Loading";


class TeamPage extends React.Component {
    state = {
        loading: true,
        articles: [],
        names: [],
    }


    componentDidMount() {
        let id = this.props.match.params.teamId

        Promise.all([
            getTeamNames(),
            getTeamsArticles(id)
        ]).then(([names, articles]) => this.setState(() => ({
            names: names,
            loading: false,
            articles: articles,
            })))
    }

    render() {
        const {loading, articles , names} = this.state
        const {match} = this.props
        const {teamId} = match.params

        if (loading === false && names.includes(teamId) === false) {
            return <Redirect to='/'/>
        }

        return (
            <div >
                <Team id={teamId}>
                    {(team) => team === null
                        ? <Loading text='loading'/>
                        : <div className='panel'>
                            <TeamLogo id={teamId}/>
                            <h1 className="medium-header">{team.name}</h1>
                            <h4 style={{margin: 5}}>
                                <Link style={{cursor: 'pointer'}}
                                      to={
                                          {
                                              pathname: `/players`,
                                              search: `?teamId=${teamId}`
                                          }
                                      }
                                >
                                    view roster
                                </Link>
                            </h4>
                            <ul className='championships'>
                                {team.championships.map((ship) => (
                                    <li key={ship}>
                                        {ship}
                                    </li>
                                ))}
                            </ul>
                            <ul className='info-list row' style={{width: '100%', textAlign:'center'}}>
                                <li>established <div>{team.established}</div></li>
                                <li>manager <div>{team.manager}</div></li>
                                <li>coach <div>{team.coach}</div></li>
                                <li>record <div>{team.wins}-{team.losses}</div></li>
                            </ul>
                            <h2 className='header'>
                                ARTICLES
                            </h2>
                            {/*date title id*/}
                            <ul className='articles'>
                                {this.state.articles.map((article) => (
                                    <li key={article.id}>
                                        <Link to={`${match.url}/articles/${slug(article.id)}`}
                                        >
                                            <h4 className='article-title'>
                                                {article.title}
                                            </h4>
                                            <div className='article-date'>
                                                {article.date.toLocaleDateString()}
                                            </div>
                                        </Link>

                                    </li>

                                    ))}
                            </ul>
                        </div>
                    }
                </Team>
            </div>

        )
    }
}


export default TeamPage