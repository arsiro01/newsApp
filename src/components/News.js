import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps  = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey="use your api"&page=1&pageSize=6`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults });
  }
  handlePreviClick = async () => {
    console.log("previous Clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey="use your api"=${
      this.state.page - 1
    }&pageSize=6`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  handleNextClick = async () => {
    console.log("next clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey="use your api"&page=${
      this.state.page + 1
    }&pageSize=6`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Dainik Duniya - Top Headlines</h1>
        <div className="row">
          {this.state.articles?.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={
                    element.title ? element.title.slice(0, 40) : "No Title"
                  }
                  description={
                    element.description
                      ? element.description.slice(0, 90)
                      : "No Description"
                  }
                  imageUrl={
                    element.urlToImage ? element.urlToImage : "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c08242690_evo_i7.png"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark "
            onClick={this.handlePreviClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page+1 > Math.ceil(this.state.totalResults/6)}
            type="button"
            className="btn btn-dark "
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
