import { useState } from 'react';
import './App.css';

const randomId = () => Math.floor(Math.random() * 100);

export const App = () => {
    const states = {
        empty: 'empty',
        isLoading: 'loading',
        hasLoaded: 'loaded',
        hasError: 'error',
    };

    const transitions = {
        [states.empty]: {
            FETCH_IMG: states.isLoading
        },
        [states.isLoading]: {
            FETCH_IMG_SUCCESS: states.hasLoaded,
            FETCH_IMG_ERROR: states.hasError,
        },
        [states.hasLoaded]: {
            FETCH_IMG: states.isLoading
        },
        [states.hasError]: {
            FETCH_IMG: states.isLoading
        }
    };

    const transition = (currentState, action) => {
        const nextState = transitions[currentState][action];
        return nextState || currentState;
    };
    const updateState = (action) => {
        setCurrentState((currentState) => transition(currentState, action))
    };

    const compareState = (state) => currentState === state;

    const [currentState, setCurrentState] = useState(states.empty);
    const [imageSrc, setImageSrc] = useState(null);

    // const [isEmpty, setIsEmpty] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);
    // const [hasLoaded, setHasLoaded] = useState(false);
    // const [hasError, setHasError] = useState(false);

    const fetchCharacterImage = () => {
        updateState('FETCH_IMG');

        fetch(`https://rickandmortyapi.com/api/character/${randomId()}`)
            .then((res) => res.json())
            .then(({ image }) => {
                setTimeout(() => {
                    setImageSrc(image);
                    updateState('FETCH_IMG_SUCCESS');
                }, 700)
            })
            .catch(() => updateState('FETCH_IMG_ERROR'))
    };

  return (
      <div className="page">
        <header>
          Rick and Morty Character
        </header>
        {!compareState(states.hasLoaded) && (
              <div className={`${compareState(states.empty) ? 'empty' : ''} ${compareState(states.isLoading) ? 'loading' : ''} ${compareState(states.hasError) ? 'error' : ''} w-72 h-72`} />
        )}
        {compareState(states.hasLoaded) && <img src={imageSrc} alt="img" />}
        <div className="container" />
        {compareState(states.empty) && <p>What you are waiting for? Fetch the first character!</p>}
        {compareState(states.hasError) && <p>An error has occurred. Please try again.</p>}
        <div />
        <button onClick={fetchCharacterImage} type="button" className="button">Fetch</button>
      </div>
  );
};

export default App;
