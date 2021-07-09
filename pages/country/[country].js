export default function countryName({ countryStats }) {
  return (
    <div className="main">
      <h1 className="title">Статистика по COVID-19</h1>
      <h2 className="title">{countryStats.country}</h2>
      <p>
        Континент: <span className="value">{countryStats.continent}</span>
      </p>
      <p>
        Популяция: <span className="value">{countryStats.population}</span>
      </p>
      <div className="cards">
        <div className="cards_item">
          <p className="cards_item_title">
            Заболевшие: {countryStats.cases.total}
          </p>
          <p>
            <span className="m_pop">
              {countryStats.cases['1M_pop']} / 1 млн. населения
            </span>
          </p>
          <p>
            Новые случаи за сутки:
            <span className="value new"> {countryStats.cases.new || 0}</span>
          </p>
          <p>
            Болеют в активной стадии:
            <span className="value">{countryStats.cases.active}</span>
          </p>
          <p>
            Критическое состояние:
            <span className="value">{countryStats.cases.critical}</span>
          </p>
          <p>
            Выздоровели:
            <span className="value">{countryStats.cases.recovered}</span>
          </p>
        </div>
        <div className="cards_item">
          <p className="cards_item_title">
            Умерли: {countryStats.deaths.total}
          </p>
          <p>
            <span className="m_pop">
              {countryStats.deaths['1M_pop']} / 1 млн. населения
            </span>
          </p>
          <p>
            Новые случаи за сутки:
            <span className="value new"> {countryStats.deaths.new || 0}</span>
          </p>
        </div>
        <div className="cards_item">
          <p className="cards_item_title">
            Сдали тест: {countryStats.tests.total}
          </p>
          <p>
            <span className="m_pop">
              {countryStats.tests['1M_pop']} / 1 млн. населения
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(
    `https://covid-193.p.rapidapi.com/statistics?country=${params.country}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.customKey,
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      },
    }
  );
  const data = await response.json();
  const countryStats = data.response[0];
  return {
    props: { countryStats }, // will be passed to the page component as props
  };
}
