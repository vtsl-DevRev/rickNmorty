import React from 'react';
import './CharacterComponent.css';

const CharacterComponent = ({ characterDetails, data }) => {

    return (
        <div id='characterApperanceInfo'>
            <div id='anotheridid'>
                <img src={characterDetails.Image} alt={characterDetails.Name} />
                <div id='characterDetailsInfo'>
                    <h2>{characterDetails.Name}</h2>
                    <div id='basicDetailsInfo'>
                        <button style={{ backgroundColor: characterDetails.Status === 'Alive' ? 'green' : characterDetails.Status === 'Dead' ? 'red' : 'grey' }}></button>
                        <p>{characterDetails.Status} - {characterDetails.Species}</p>
                    </div>
                    <div id='locationDetailsInfo'>
                        <p className='divHead'>Location:</p><p>{characterDetails.Location?.name}</p>
                    </div>
                </div>
            </div>
            <div id='episodeDetailsInfo'>
                {
                    data && Array.isArray(data) ? data.map((episode) => (
                        <div key={episode.id} className='episode'>
                            <p>{episode.name}</p>
                            <p>{episode.episode}</p>
                            <p>{episode.air_date}</p>
                        </div>
                    )) : data ? <div key={data.id} className='episode'>
                        <p>{data.name}</p>
                        <p>{data.episode}</p>
                        <p>{data.air_date}</p>
                    </div> : <p>Nothing to see here.</p>
                }
            </div>
        </div>
    );
}

export default CharacterComponent;
