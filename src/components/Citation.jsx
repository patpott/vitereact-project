import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Citation = () => {
  const [citation, setCitation] = useState('');
  const [author, setAuthor] = useState('');
  const [authorExtract, setAuthorExtract] = useState('');

  const fetchCitation = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      const { data } = response;
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex].text;
      const author = data[randomIndex].author;
      setCitation(quote);
      setAuthor(author);
      setAuthorExtract('');
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const fetchAuthorInfo = async () => {
    try {
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${author}`);
      const { data } = response;
      const extract = data.extract;
      setAuthorExtract(extract);
    } catch (error) {
      console.error('Error fetching author info:', error);
    }
  };

  useEffect(() => {
    fetchCitation();
  }, []);

  return (
    <div className="my-4 container mx-auto">
      <div className="max-w-md mx-auto bg-white border-black border-2 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Citation</h2>
        <p>{citation}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchCitation}>
          Générer une citation aléatoire
        </button>
        {author && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Auteur</h2>
            <p>{author}</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={fetchAuthorInfo}
            >
              Afficher les informations sur l'auteur
            </button>
            {authorExtract && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Extrait de l'article sur l'auteur</h2>
                <p>{authorExtract}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Citation;