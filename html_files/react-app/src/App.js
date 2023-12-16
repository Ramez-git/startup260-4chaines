import React, { useState, useEffect } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome');
  const [realTimeUpdates, setRealTimeUpdates] = useState('Existing Users: ');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setWelcomeMessage(`Welcome, ${username}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to connect to the server. Please try again later. Error: ${error.message}`);
    }
  };

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      displayResult(data);
    } catch (error) {
      console.error(error);
      displayResult({ error: 'Failed to fetch the quote.' });
    }
  };

  const displayResult = (data) => {
    const resultElement = document.getElementById('Quote');
    if (data.error) {
      resultElement.innerHTML = `<p>${data.error}</p>`;
    } else {
      resultElement.innerHTML = `<blockquote>${data.content}</blockquote>
                                   <p>- ${data.author}</p>`;
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');

    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const realTimeUpdatesElement = document.getElementById('realTimeUpdates');
      if (data.existingUsers) {
        const userList = data.existingUsers.join(', ');
        setRealTimeUpdates(`Existing Users: ${userList}`);
      }
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

    socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    return () => {
      // Cleanup WebSocket on component unmount
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <header>
        <h1 style={{ fontFamily: 'Times New Roman', fontStyle: 'bold' }}>
        <img src="./icon.png" style={{ width: '1.5em', height: '1.5em', paddingRight: '.2em' }} alt="Theme pic" />
BYUchan<sup dangerouslySetInnerHTML={{ __html: '&Yopf;' }}></sup>
        </h1>
        <hr />
        <form id="loginForm">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />

          <button type="button" onClick={handleLogin}>
            Sign In/Up
          </button>
        </form>
        <h2 id="welcomeMessage">{welcomeMessage}</h2>
        <h3>Boards and Rooms</h3>
        <nav>
          <menu>
            <table>
              <tbody>
                <tr>
                  <td>
                  <a href="../../pages/Animal.html">Animals</a>
                  </td>
                  <td>
                    <a href="../../pages/Auto.html">Auto</a>
                  </td>
                  <td>
                    <a href="../../pages/Movies.html">Movies</a>
                  </td>
                  <td>
                    <a href="../../pages/News.html">News</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="../../pages/Science.html">Science</a>
                  </td>
                  <td>
                    <a href="../../pages/Majors.html">Majors</a>
                  </td>
                  <td>
                    <a href="../../pages/Random.html">Random</a>
                  </td>
                  <td>
                    <a href="../../pages/Video Games.html">Video Games</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </menu>
        </nav>
        <div style={{ textAlign: 'end' }}>
          <p>Quote of the day: </p>
          <div id="Quote"></div>
          <div id="realTimeUpdates">{realTimeUpdates}</div>
          <div id="internalserver"></div>
        </div>
      </header>
      <footer style={{ textAlign: 'end' }}>
        <hr />
        <span className="text-reset">Ramez Gammoh</span>
        <br />
        <a href="https://github.com/Ramez-git/startup260-BYUchan">GitHub</a>
      </footer>
    </>
  );
};

export default App;
