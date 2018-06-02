import React from 'react'
import PropTypes from 'prop-types'
import {getArticle, getTeam} from "../utils/api";

class Article extends React.Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired,
        teamId: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }

    state = {
        article: null,
    }

    getArticle = (teamId,articleId) => {
        this.setState(() => ({
            article: null
        }))

        getArticle(teamId,articleId).then((article) => this.setState(() => ({
            article: article,
        })))
    }

    componentDidUpdate(prev) {
        if (this.props.articleId !== prev.articleId) {
            this.getArticle(this.props.teamId, this.props.articleId)
        }
    }


    componentDidMount() {
        console.log(this.props)
        this.getArticle(this.props.teamId, this.props.articleId)
    }

    render() {
        return this.props.children(this.state.article)
    }

}

export default Article