import { useState, useEffect } from 'react';
import { CustomLink } from './CustomLink';

const pages = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const index = ({ countries }) => {
  const [input, setInput] = useState('');
  const [findedCountries, setFindedCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState('A');

  useEffect(() => {
    const newCountries = countries.filter((el) =>
      el.startsWith(currentPage.toUpperCase())
    );
    setFindedCountries((prev) => [...newCountries]);
  }, []);

  const handleChange = (e) => {
    setInput((prev) => e.target.value);
  };

  const handleSearch = (e) => {
    if (e.keyCode === 13 && input) {
      const newCountries = countries.filter((el) =>
        el.startsWith(input[0].toUpperCase())
      );
      setFindedCountries(() => [...newCountries]);
    }
  };

  const handleClickOnLetter = (e) => {
    const letter = e.target.innerText;
    const newCountries = countries.filter((el) => el.startsWith(letter));
    setFindedCountries((prev) => [...newCountries]);
    setCurrentPage(letter);
  };

  const handleClickOnArrow = (e) => {
    const indexLetter = pages.indexOf(currentPage);
    if (e.target.alt === 'left') {
      if (currentPage !== pages[0]) {
        const newCountries = countries.filter((el) =>
          el.startsWith(pages[indexLetter - 1])
        );
        setFindedCountries((prev) => [...newCountries]);
        setCurrentPage(() => pages[indexLetter - 1]);
      }
    } else {
      if (currentPage !== pages[pages.length - 1]) {
        const newCountries = countries.filter((el, i, arr) =>
          el.startsWith(pages[indexLetter + 1])
        );
        setFindedCountries((prev) => [...newCountries]);
        setCurrentPage(() => pages[indexLetter + 1]);
      }
    }
  };

  return (
    <div className="main">
      <h1 className="title">Статистика по COVID-19</h1>
      <p className="subtitle">Поиск по стране</p>
      <div className="search">
        <input
          className="search-bar"
          type="text"
          value={input}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleSearch(e)}
        />
      </div>
      <ul>
        {findedCountries &&
          findedCountries.map((country) => (
            <li className="listItem" key={country}>
              <CustomLink href={`/country/${country}`} text={country} />
            </li>
          ))}
      </ul>
      <div className="pages">
        <img
          onClick={(e) => handleClickOnArrow(e)}
          className="arrow"
          src="../static/arrowLeft.png"
          alt="left"
        />
        {pages.map((page, index) => (
          <span
            onClick={(e) => handleClickOnLetter(e)}
            className={currentPage === page ? 'currentPage' : 'page'}
            key={index}
          >
            {page}
          </span>
        ))}
        <img
          onClick={(e) => handleClickOnArrow(e)}
          className="arrow"
          src="../static/arrowRight.png"
          alt="right"
        />
      </div>
    </div>
  );
};

export default index;

export async function getStaticProps(context) {
  const response = await fetch('https://covid-193.p.rapidapi.com/countries', {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'd319428a87msh1d27b9fe10c478cp127aa6jsn09723ce37241',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    },
  });
  const data = await response.json();
  const countries = data.response;
  return {
    props: { countries }, // will be passed to the page component as props
  };
}
