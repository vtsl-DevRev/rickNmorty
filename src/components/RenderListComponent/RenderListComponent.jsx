import axios from 'axios';
import './RenderListComponent.css'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import CharacterComponent from '../CharacterComponent/CharacterComponent';

const RenderListComponent = ({ charactersData }) => {

    const [episodeList, setEpisodeList] = useState([]);
    const [characterDetails, setCharacterDetails] = useState({});

    const handleClick = (event) => {
        const characterId = event.target.parentElement.parentElement.id;

        const characterEpisode = [];
        let characterDetails = {};

        charactersData.forEach(characterEle => {
            if (characterEle.id === parseInt(characterId)) {

                characterDetails.Image = characterEle.image;
                characterDetails.Name = characterEle.name;
                characterDetails.Status = characterEle.status;
                characterDetails.Species = characterEle.species;
                characterDetails.Location = characterEle.location;

                characterEle.episode.forEach(episode => {
                    const episodeId = episode.split('/').pop();
                    characterEpisode.push(episodeId);
                });
            }
        });

        setCharacterDetails(characterDetails);
        setEpisodeList(characterEpisode);
    };

    const getEpisodeData = async ({ queryKey }) => {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${queryKey[1]}`);
        return response.data;
    };

    const { data, isLoading, isError } = useQuery(['episodeData', episodeList], getEpisodeData, {
        enabled: episodeList.length > 0,
    });
    
    return (
        <React.Fragment>
            {
                isLoading ? <div>Loading...</div> : isError ? <div>Error fetching data</div> : data && data.length > 0 ? <CharacterComponent characterDetails={characterDetails} data={data}/> : null
            }
            <div id='characterList'>
                {
                    charactersData.map((character) => {
                        return (
                            <div key={character.id} id={character.id} className='character'>
                                <img src={character.image} alt={character.name} />
                                <div className='characterDetails'>
                                    <h2 onClick={handleClick}>{character.name}</h2>
                                    <div id='basicDetails'>
                                        <button style={{ backgroundColor: character.status === 'Alive' ? 'green' : character.status === 'Dead' ? 'red' : 'grey' }}></button>
                                        <p>{character.status} - {character.species}</p>
                                    </div>
                                    <div id='locationDetails'>
                                        <p className='divHead'>Location:</p><p>{character.location.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default RenderListComponent