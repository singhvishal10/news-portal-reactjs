import React from "react";
import defaultNewsImg from './defaultNews.jpg';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date} = props;
  return (
    <div className="card mb-3" style={{width:'100%'}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={
              !imageUrl
                ? defaultNewsImg
                : imageUrl
            }
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8">
        <div className="card-header bg-transparent">
            <h5 className="card-title">{title}</h5>
            </div>
          <div className="card-body">
            <p className="card-text align-middle">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
          <div className="card-footer bg-transparent" style={{width:'inherit', position: 'absolute',
                bottom: '0px'}}>
            <a
              rel="noreferrer"
              href={newsUrl}
              // eslint-disable-next-line 
              // target="_blank"
              className="btn btn-sm btn-primary"
              role="button"
              // data-bs-toggle="button"
              style={{width:'100%'}}
            >
              Read More
            </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
