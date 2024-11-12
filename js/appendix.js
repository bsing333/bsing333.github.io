// Google Sheets API - Replace with your actual Google Sheets API key and sheet ID
const API_KEY = 'AIzaSyA7Un7q8RhZXTdyzvxnYaDcqUXDizcI46c'; // Your API Key
const SHEET_ID = '1B5_VDYBUBzSRr9nV004F1ZT2F8xezJMV2v4odGlZHx8'; // Your Google Sheet ID
const RANGE1 = 'Sheet1!B3:D5'; // Adjust the range to skip the header row and start from row 3
const RANGE2 = 'Sheet1!B6:D9'; // Adjust the range for the second set of footnotes
const RANGE3 = 'Sheet1!B10:D16'; // New range for the third set of footnotes

/**
 * Fetch the current time in New York and format it with spans.
 */
function getNewYorkTime() {
  const newYorkOffset = -5; // New York is GMT-5
  const now = new Date();
  const nyTime = new Date(now.getTime() + (now.getTimezoneOffset() + newYorkOffset * 60) * 60000);

  const day = nyTime.toLocaleDateString('en-US', { weekday: 'long' });
  const month = nyTime.toLocaleDateString('en-US', { month: 'long' });
  const date = nyTime.getDate();
  const year = nyTime.getFullYear();
  const time = nyTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const ordinal = (n) => ['th', 'st', 'nd', 'rd'][(n % 10 > 3 || [11, 12, 13].includes(n % 100)) ? 0 : n % 10];

  return `<span class="first-data">${day}, ${month} ${date}${ordinal(date)} ${year}</span> at <span class="first-data">${time}</span>`;
}

/**
 * Hover Effect - Add blur effect to main content when hovering over footnotes
 */
function addHoverEffect() {
  const mainContent = document.querySelector('.main-content');
  const footnoteItems = document.querySelectorAll('.footnote-item');

  footnoteItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      mainContent.classList.add('blur');
    });

    item.addEventListener('mouseleave', () => {
      mainContent.classList.remove('blur');
    });
  });
}

/**
 * Update the viewport size display dynamically without recalling footnotes.
 */
function updateViewportInfo() {
  const viewportInfo = document.querySelector('.viewport-info-container');
  if (viewportInfo) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    viewportInfo.innerHTML = `You are currently viewing this website at <span class="first-data pixel-counter">${width}px width</span> by <span class="first-data">${height}px height</span>.`;
  }
}

/**
 * Fetch footnotes from a specific range in Google Sheets.
 */
async function fetchFootnotes(range, rangeType, startCount = 1) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const footnotes = data.values || [];
  const footnotesContainer = document.querySelector('.footnotes');

  // Create an ordered list element
  const footnotesList = document.createElement('ol');
  footnotesList.setAttribute('start', startCount);

  footnotes.forEach((row) => {
    const listItem = document.createElement('li');
    const linkSpan = document.createElement('span');
    linkSpan.classList.add(rangeType);

    listItem.innerHTML = `${row[0]} `;
    linkSpan.innerHTML = `<a href="${row[2]}" target="_blank">${row[1]}</a>`;
    listItem.appendChild(linkSpan);
    listItem.classList.add('footnote-item');
    footnotesList.appendChild(listItem);
  });

  if (rangeType === 'first-data') {
    const viewportListItem = document.createElement('li');
    viewportListItem.innerHTML = `<span class="viewport-info-container"></span>`;
    viewportListItem.classList.add('footnote-item');
    footnotesList.appendChild(viewportListItem);

    const viewportInfo = viewportListItem.querySelector('.viewport-info-container');
    if (viewportInfo) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      viewportInfo.innerHTML = `You are currently viewing this website at <span class="first-data pixel-counter">${width}px width</span> by <span class="first-data">${height}px height</span>.`;
    }

    const timeListItem = document.createElement('li');
              async function fetchUserLocation() {
                try {
                  const response = await fetch('https://ipapi.co/json/');
                  if (!response.ok) throw new Error('Failed to fetch user location.');

                  const data = await response.json();
                  const city = data.city || '';
                  const region = data.region || ''; // State/Region
                  const country = data.country_name || '';

                  // Format location: City only in a <span class="first-data">
                  if (country === 'United States' && region) {
                    return city ? `<span class="first-data">${city}</span>, ${region}` : region;
                  } else if (city && country) {
                    return `<span class="first-data">${city}</span>, ${country}`;
                  } else {
                    return country || '';
                  }
                } catch (error) {
                  console.error('Location fetch failed:', error);
                  return ''; // Return empty string if API fails
                }
              }

              const now = new Date();
              const day = now.toLocaleDateString('en-US', { weekday: 'long' });
              const month = now.toLocaleDateString('en-US', { month: 'long' });
              const date = now.getDate();
              const year = now.getFullYear();
              const time = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
              });

              const ordinal = (n) => ['th', 'st', 'nd', 'rd'][(n % 10 > 3 || [11, 12, 13].includes(n % 100)) ? 0 : n % 10];
              const location = await fetchUserLocation();
              const locationText = location ? ` in ${location}` : '';

              timeListItem.innerHTML = `
                This website was loaded at 
                <span class="first-data">${day}, ${month} ${date}${ordinal(date)} ${year}</span> 
                at 
                <span class="first-data">${time}</span>${locationText}.
              `;
    timeListItem.classList.add('footnote-item');
    footnotesList.appendChild(timeListItem);
  }

  footnotesContainer.appendChild(footnotesList);
  return footnotes.length + (rangeType === 'first-data' ? 2 : 0);
}

/**
 * Fetch and display all footnotes.
 */
async function fetchAllFootnotes() {
  const footnotesContainer = document.querySelector('.footnotes');
  if (!footnotesContainer) {
    console.error('Footnotes container not found.');
    return;
  }

  // Add the footnotes header
  const header = document.createElement('div');
  header.classList.add('footnotes-header');
  header.textContent = 'Footnotes';
  footnotesContainer.appendChild(header);

  // Fetch ranges and dynamically set start counts
  let totalCount = 1;
  totalCount += await fetchFootnotes(RANGE1, 'first-data', totalCount);
  totalCount += await fetchFootnotes(RANGE2, 'second-data', totalCount);
  await fetchFootnotes(RANGE3, 'third-data', totalCount);
  
  // Add hover effect after all footnotes are loaded
  addHoverEffect();
}

/**
 * Initialize the script when the page loads.
 */
window.addEventListener('load', async () => {
  await fetchAllFootnotes();
  updateViewportInfo();
  window.addEventListener('resize', updateViewportInfo);
});