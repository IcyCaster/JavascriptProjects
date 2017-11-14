/*
    ./client/components/App.jsx
*/
import React from 'react';

export default class App extends React.Component {
    render() {
        const now = new Date();
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Hello World</h1>
                <p>Current Time: {now.toTimeString()}</p>
                <CommentBox/>
            </div>
        );
    }
}

class CommentBox extends React.Component {

    constructor() {
        super();

        this.state = {
            showComments: false
        };
    }

    render() {
        const comments = this._getComments();
        const count = this._getCommentsTitle(comments.length);

        let buttonText = "Show comments";
        let commentNodes; 

        if (this.state.showComments) {
            buttonText = "Hide comments";
            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return (
            <div className="comment-box">
                <h4 className="h4">{this._getCommentsTitle(comments.length)}</h4>
                <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
                {commentNodes}
            </div>
        );
    }

    _handleClick(){
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _getComments() {
        const commentList = [
            {id: 1, author: "Bob", body: "This is neat!"},
            {id: 2, author: "Jill", body: "Hmmmmm"},
            {id: 3, author: "Billy", body: "You suck"}
        ];
        return commentList.map((comment) => {
            return (<Comment
                    author={comment.author} body={comment.body} key={comment.id}/>
            );
        });
    }

    _getCommentsTitle(count) {
        if (count === 0) {
            return "No comments";
        }
        if (count === 1) {
            return "1 comment";
        }
        else {
            return `${count} comments`;
        }
    }
}

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.author}</p>
                <p className="comment-body">
                    {this.props.body}
                </p>
                <div className="class-footer">
                    <a href="#" className="comment-footer-delete">
                        Delete Comment
                    </a>
                </div>
            </div>
        );
    }
}
