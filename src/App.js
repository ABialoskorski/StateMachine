import { useState } from 'react';
import './App.css';

const randomId = () => Math.floor(Math.random() * 100);

export const App = () => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const fetchCharacterImage = () => {
        setIsLoading(false);
        setIsEmpty(false);
        setHasError(false);
        setHasLoaded(false);

        fetch(`https://rickandmortyapi.com/api/character/${randomId()}`)
            .then((res) => res.json())
            .then(({ image }) => {
                setIsLoading(true);
                setTimeout(() => {
                    setImageSrc(image);
                    setIsLoading(false);
                    setHasLoaded(true);
                    setIsEmpty(false)
                }, 700)
            })
            .catch(() => setHasError(true))
    };

  return (
      <div className="page">
        <header>
          Rick and Morty Character
        </header>
        {!hasLoaded && (
              <div className={`${isEmpty ? 'empty' : ''} ${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''} w-72 h-72`} />
        )}
        {hasLoaded && <img src={imageSrc} alt="img" />}
        <div className="container" />
        {isEmpty && <p>What you are waiting for? Fetch the first character!</p>}
        {hasError && <p>An error has occurred. Please try again.</p>}
        <div />
        <button onClick={fetchCharacterImage} type="button" className="button">Fetch</button>
      </div>
  );
};

export default App;
