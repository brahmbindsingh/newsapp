import React, { Component } from 'react'

class NewsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
  }
  render() {
    let {title, description, imageUrl, url, author, source, time} = this.props;
    return (
      <div className='my-3 '>
        <div className="card" >
          <img src={imageUrl ? imageUrl : "https://i0.wp.com/www.agilenative.com/wp-content/uploads/2017/01/001-Agile-Hello-World.png?fit=1745%2C1080&ssl=1"} className="card-img-top" alt="..." />
          <div className="card-body">
            <p>{source}</p>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <div className='d-flex justify-content-between'>
              <p>
                {author ? author : "Unknown"}
              </p>
              <p>
                {new Date(time).toGMTString()}
              </p>
            </div>
            <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem