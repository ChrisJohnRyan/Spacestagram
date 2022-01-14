import { useState } from 'react';
import { React, useRef, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';

const List = () => {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentDate, setCurrentDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
  // The empty array passed in to useEffect acts like componentDidMount and only run one time, when the component first mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }
  //useEffect function that listens for a change to isFetching. We do that by putting isFetching inside the array that’s passed to the second parameter to useEffect.
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);


  async function fetchMoreListItems() {
    setCurrentDate(Moment(currentDate).subtract(1, 'days').format('YYYY-MM-DD'));
    await axios.get(`https://api.nasa.gov/planetary/apod?api_key=hbch8rEXfZn1AAlrru77M8BmTIjzCeCOFFKkGUYn&date=` + currentDate)
    .then(res => {
        setListItems(prevState => ([...prevState,res.data]));
        setIsFetching(false);
      })
  }
  

  return (
    <>
    <ul className="list-group mb-2">
      {listItems.map(listItem => 
        <li className="data-list-item">
          <h1 class="data-list-text">{listItem.title}</h1>
          <a href={listItem.url}>
            <img class="data-list-image" src={listItem.url} alt={listItem.explanation} /></a>
          <p class="data-list-text">
            <span>&copy;</span>{listItem.copyright},<span>&nbsp;&nbsp;</span>
            {listItem.date}
          </p>
          <p class="data-list-text">
            {listItem.explanation}
          </p>
        </li>
  )}
    </ul>
      {isFetching && 'Fetching more list items...'}
    </>
  );
};

export default List;