import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../../actions/postActions'

function PostForm({addPost}){
    const [text, setText] = useState('')

    // const handleChange = (e) => {
    //     setText({
    //         [e.target.name]: [e.target.value]
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        addPost({text})
        setText('')
    }

    return(
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Write Something...</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="form my-1">
                <textarea 
                    name="text" 
                    cols="30" 
                    rows="5" 
                    placeholder="Create a Post" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <input 
                    type="submit" 
                    className="btn btn-dark my-1" 
                    value="submit" 
                />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)