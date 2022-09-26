import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props)
  
    this.state = {
      page: 1,
      articles: [],
      totalResults: 0,
      loader: false,
    }
    document.title = `${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} - NewsMonkey`;

  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=677406a16f424543b27737e0f5ecf73a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loader: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loader: false
    })
  }

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=677406a16f424543b27737e0f5ecf73a&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loader: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loader: false
    // })
    this.updateNews();
  }

  handlePrevClick = async () => {
  //   console.log("prev");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=677406a16f424543b27737e0f5ecf73a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

  //   this.setState({loader: true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json()

  //   this.setState({
  //     page: this.state.page - 1,      
  //     articles: parsedData.articles,
  //     loader: false
  //   })
    this.setState({page: this.state.page - 1})
    this.updateNews();
  }

  handleNextClick = async () => {
    // console.log("next");
  //   if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     console.log("next2");
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=677406a16f424543b27737e0f5ecf73a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loader: true})
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     this.setState({
  //       page: this.state.page + 1,      
  //       articles: parsedData.articles,
  //       loader: false,
  //     })
  //   }
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-5'>NewsMonkey - Top Headlines</h1>
        <h3 className='text-center'>{this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)}</h3>
        {this.state.loader && <Spinner />}
        <div className="row">
          {!this.state.loader && this.state.articles.map((el, index)=>{
            return <div className="col-md-4" key = {el.url}>
              <NewsItem title = { el.title ? el.title.slice(0,45) : "" } description = { el.description ? el.description.slice(0,88) : ""} imageUrl = {el.urlToImage} url = {el.url} author = { el.author ? el.author : "" } source = {el.source.name} time = {el.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled = {this.state.page<=1} type = "button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type = "button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News