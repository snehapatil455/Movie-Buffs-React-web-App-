import styled from "styled-components";

import React, { useState } from "react";
import axios from "axios";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
export const API_KEY = "23bbffa1";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;



const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;


function App() {
  const [searchQuery, updateSearchQuery] =useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

const fetchData= async (searchString) =>{
   const response = await axios.get(
     `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
     );
    
     updateMovieList(response.data.Search)

};
const onTextChange = (event) => {
  onMovieSelect("")
  clearTimeout(timeoutId);
  updateSearchQuery(event.target.value);
  const timeout = setTimeout(() => fetchData(event.target.value), 500);
  updateTimeoutId(timeout);

};
  return (
    <Container>
      <Header>
        <AppName>
        <MovieImage src="/movie-icon.svg"/>
          Movie-Buffs
          </AppName>
          <SearchBox>
          <SearchIcon src="/search-icon.svg"/>
          <SearchInput placeholder="Search Movie" 
           value ={searchQuery} 
          onChange={onTextChange}/>
          </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}

      <MovieListContainer>
      {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
      ):(
        <Placeholder src ="/movie-icon.svg"/>
          )}

       
        
         
          
      </MovieListContainer>
  
    </Container>
  );
   
  
}

export default App;
