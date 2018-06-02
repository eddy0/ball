import React from 'react'
import { Route, Link } from 'react-router-dom'
import Sidebar from "./Sidebar";
import Article from "./Article";
import {getTeamsArticles} from "../utils/api";
import Loading from "./Loading";

class Articles extends React.Component {

    state= {
        loading: true,
        articles: []
    }

    componentDidMount() {
        let id = this.props.match.params.teamId
        getTeamsArticles(id)
            .then((articles) => this.setState(() => ({
                loading: false,
                articles: articles,
            })))
    }

    render() {
        const {loading, articles} = this.state
        const {match} = this.props
        const list = articles.map((article) => article.title)
        console.log(articles)

        return loading === true
            ?  <Loading text='loading'/>
            : <div className='container two-column'>
                  <Sidebar title='articles' list={list} loading={loading} {...this.props}/>
                <Route path={`${match.url}/:articleId`} render={({match}) => (
                    <Article articleId={match.params.articleId} teamId={this.props.match.params.teamId}>
                        {(article) => !article
                            ? <Loading text='loading'/>
                            : (
                            <div className="panel">
                                <article className='article' key={article.id}>
                                    <h1 className="header"> {article.title}</h1>
                                    <p>{article.body}</p>
                                </article>
                            </div>
                        )}

                    </Article>

                )} />
                </div>

    }
}

export default Articles