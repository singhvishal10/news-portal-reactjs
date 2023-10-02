import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const apiKeyNews = "59014fc2c7msh3282451031a043bp1d470cjsne3072278335f";

    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        let currentCategory = props.category === "Search Results" ? "news" : props.category;
        props.setProgress(10);
        const url = `https://newscatcher.p.rapidapi.com/v1/search?q=${props.query}&country=${props.country}&topic=${currentCategory}&lang=${props.language}&sort_by=date&media=true&page_size=${props.pageSize}&page=${page+1}`
        setLoading(true)
        let data = await fetch(url,{
            method: "GET",
            headers: {"x-rapidapi-key": apiKeyNews,
                      "x-rapidapi-host": "newscatcher.p.rapidapi.com"}
          });
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setPage(parsedData.page);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalPage(parsedData.total_pages);
        props.setProgress(100);
    }

    useEffect(() => {
        let isCancelled = false;
        document.title = `${capitalizeFirstLetter(props.category)} - News Nest`;
        if (!isCancelled) {
        updateNews(); }

        //Cleanup function is called when useEffect is called again or on unmount
    return () => {
        isCancelled = true;
      };
        // eslint-disable-next-line
    }, [props.query])


    const fetchMoreData = async () => {  
        let currentCategory = props.category === "Search Results" ? "news" : props.category; 
        const url = `https://newscatcher.p.rapidapi.com/v1/search?q=${props.query}&country=${props.country}&topic=${currentCategory}&lang=${props.language}&sort_by=date&media=true&page_size=${props.pageSize}&page=${page+1}`
        let data = await fetch(url,{
            method: "GET",
            headers: {"x-rapidapi-key": apiKeyNews,
                      "x-rapidapi-host": "newscatcher.p.rapidapi.com"}
          });
        let parsedData = await data.json()
        setPage(parsedData.page);
        setArticles(articles.concat(parsedData.articles))
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>{capitalizeFirstLetter(props.category)} : Top Headlines </h1>
                <Spinner loading={loading}/>
                {articles && <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={page !== totalPage}
                    loader={<Spinner loading={true}/>}>
                    <div className="container">                 
                    <div className="card-group">
                        {articles.map((element) => {
                            return <div key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.excerpt ? element.excerpt : element.summary?element.summary:" "} imageUrl={element.media} newsUrl={element.link} author={element.author} date={element.published_date} source={element.rights} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>}
                {
                    !articles && <div className="container">  <h4>No matches for your search...</h4> <h5>Try refining keyword as per relevance to {props.category} in search field</h5></div>
                }
            </>
        )
    
}


News.defaultProps = {
    country: 'IN',
    pageSize: 9,
    category: 'news',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News





