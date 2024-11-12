// Function to parse the text and apply custom classes to punctuation
function parseTextWithPunctuation() {
  const textElements = document.querySelectorAll('.flip-text'); 

  textElements.forEach(textElement => {
    const textContent = textElement.innerHTML;

    // Regex to match words and all types of punctuation, including straight and curly quotes/apostrophes
    const regex = /([a-zA-Z]+|[.,'“”‘’!?;"])/g; // Match letters and punctuation
    const words = textContent.split(regex).filter(Boolean);

    textElement.innerHTML = ''; 

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('word'); 

      // Check for punctuation marks like periods, commas, etc.
      if (/[.,!?;“”]/.test(word)) { 
        const punctuationSpan = document.createElement('span');
        punctuationSpan.classList.add('bottom-punctuation'); // Apply the class for bottom punctuation
        punctuationSpan.innerText = word;
        wordSpan.appendChild(punctuationSpan);
      } else if (/[‘’'“”]/.test(word)) { // Handling apostrophes and quotation marks
        const apostropheSpan = document.createElement('span');
        apostropheSpan.classList.add('top-punctuation'); // Apply the class for top punctuation
        apostropheSpan.innerText = word;
        wordSpan.appendChild(apostropheSpan);
      } else { // Regular words
        const wordLetters = word.split('').map(letter => {
          const letterSpan = document.createElement('span');
          letterSpan.innerText = letter;
          return letterSpan;
        });

        wordLetters.forEach(letterSpan => wordSpan.appendChild(letterSpan));
      }

      textElement.appendChild(wordSpan); 
    });
  });
}

// Call the function to parse the text
parseTextWithPunctuation();
