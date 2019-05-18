import React from 'react'
import api from 'api'

const Tags = ({ tags, onClickTag }) =>
  tags ? (
    <div className="">
      {tags.map(tag => {
        const handleClick = ev => {
          ev.preventDefault()
          onClickTag(tag, api.Articles.byTag(tag))
        }
        return (
          <a className="ui label" key={tag} onClick={handleClick}>
            {tag}
          </a>
        )
      })}
    </div>
  ) : (
    <div>Loading tags...</div>
  )

export default Tags
