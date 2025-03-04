import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({
    content: '',
    author: '',
    image: ''
  });
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Expanded map of author names to their image URLs
  const authorImages = {
    "Rumi": "https://sp.yimg.com/ib/th?id=OIP.CIvEZQdCsOhsCK67HtsJaAAAAA&pid=Api&w=148&h=148&c=7&dpr=2&rs=1",
  "Abu Bakr (R.A)": "https://up.yimg.com/ib/th?id=OIP.zLhMajwizzbnkliIDLKf7QHaEJ&pid=Api&rs=1&c=1&qlt=95&w=192&h=107",
  "Ali ibn Abi Talib (R.A)": "https://tse1.mm.bing.net/th?id=OIP.paSIOcmw38-Zd5bf0bD7QgHaI-&pid=Api&P=0&h=180",
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
    
    
    // Default image fallback
    "default": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
  };

  // Rest of the code remains the same as in the previous version
  // (Fetch quotes, get random quote, handle button click, etc.)

  // The only changes are in the authorImages object
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
                  onError={(e) => { e.target.src = authorImages.default }}
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

