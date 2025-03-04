import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({
    content: '',
    author: '',
    image: ''
  });  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map of author names to their image URLs
  const authorImages = {
    "Rumi": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Maulana.jpg/220px-Maulana.jpg",
    "Abdul Kalam": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/220px-A._P._J._Abdul_Kalam.jpg",
    "Bill Gates": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/220px-Bill_Gates_2018.jpg",
    "Albert Einstein": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
    "Abraham Lincoln": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
    "Oprah Winfrey": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Oprah_in_2014.jpg/220px-Oprah_in_2014.jpg",
    "Muhammad Ali": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg",
    "William Shakespeare": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg",
    "Mother Teresa": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/220px-Mother_Teresa_1.jpg",
    "Nelson Mandela": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/220px-Nelson_Mandela_1994.jpg",
    "Walt Disney": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Walt_Disney_1946.JPG/220px-Walt_Disney_1946.JPG",
    "Aristotle": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/220px-Aristotle_Altemps_Inv8575.jpg",
    "Abu Bakr (R.A)": "/api/placeholder/150/150",
    "Ali ibn Abi Talib (R.A)": "/api/placeholder/150/150",
    "Umar ibn Al-Khattāb (R.A)": "/api/placeholder/150/150",
    // Default image for authors not in the list
    "default": "/api/placeholder/150/150"
  };

  // Fetch all quotes when component mounts
  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('https://dummyjson.com/quotes');
        
        if (response.data && response.data.quotes && response.data.quotes.length > 0) {
          setQuotes(response.data.quotes);
          // Get a random quote from the fetched quotes
          getRandomQuote(response.data.quotes);
        } else {
          setError('No quotes found in the response');
        }
      } catch (err) {
        setError('Failed to fetch quotes: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuotes();
  }, []);

  // Function to get a random quote from the quotes array
  const getRandomQuote = (quotesArray) => {
    const quotesData = quotesArray || quotes;
    
    if (quotesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesData.length);
      const randomQuote = quotesData[randomIndex];
      const author = randomQuote.author;
      
      setQuote({
        content: randomQuote.quote,
        author: author,
        image: authorImages[author] || authorImages.default
      });
    }
  };

  // Handler for the button click
  const handleNewQuote = () => {
    setIsLoading(true);
    
    // Short timeout to show loading state
    setTimeout(() => {
      getRandomQuote();
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="quote-generator">
      <div className="quote-container">
        <h1>Random Quote Generator</h1>
        
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="quote-content">
            <blockquote>
              <p>"{quote.content}"</p>
              <div className="author-section">
                <img 
                  src={quote.image} 
                  alt={quote.author} 
                  className="author-image" 
                />
                <footer>— <cite>{quote.author}</cite></footer>
              </div>
            </blockquote>
          </div>
        )}
        
        <button
          onClick={handleNewQuote}
          disabled={isLoading}
          className="quote-button"
        >
          {isLoading ? 'Loading...' : 'Get Another Quote'}
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;