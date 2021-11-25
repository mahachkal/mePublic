import { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  furnitureVariants,
  positions,
  forVariants,
  addedVariants,
  kindVariants,
  forFilters
} from './mock'

const getRandom = (number) => {
  return Math.floor(number * Math.random())
}

const getRandomArray = (array) => {
  return array[getRandom(array.length)]
}

export const App = () => {
  const [isReady, setReady] = useState(false)
  const [position, setPosition] = useState(null)
  const [isParams, setIsParams] = useState(false)
  const [furnitue, setFurniture] = useState('')
  const [added, setAdded] = useState('')
  const [forWho, setForWho] = useState('')
  const [kind, setKind] = useState('')
  const [filters, setFilters] = useState({})

  const getRandomPosition = () => {
    const position = getRandomArray(filterPositions)
    if (position) {
      setPosition(position)
      setReady(true) 
    } else {
      console.error('position not found')
    }
  }

  const onResetParams = () => {
    setFilters({})
    setKind('')
    setForWho('')
    setFurniture('')
    setAdded('')
  }

  const toggleParams = () => {
    onResetParams()
    setIsParams(!isParams)
  }

  const onReset = () => {
    setPosition(null)
    setReady(false)
    onResetParams()
    setIsParams(false)
  }

  useEffect(() => {
    const filtersObj = {}
    if (furnitue) {
      filtersObj.furniture = furnitue
    }
    if (forWho) {
      filtersObj.for = forFilters[forWho]
    }
    if (added) {
      filtersObj.added = added
    }
    if (kind) {
      filtersObj.kind = kind
    }
     setFilters(filtersObj) 
  }, [furnitue, forWho, added, kind])

  const filterPositions = useMemo(() => {
    return positions.filter(position => 
      (
        !filters.added ||
        filters.added === position.added
      ) && (
        !filters.furniture ||
        filters.furniture === position.furniture
      ) && (
        !filters.kind ||
        position.kind.length <= 0 ||
        position.kind.includes(filters.kind)
      ) && (
        !filters.for ||
        filters.for.includes(position.for)
      )
    ) 
  }, [filters])

  return (
    <div className="App">
      <header className="App-header">
        {isReady ? 'Ты выбрала позу - ' + position.name :
        'Предлагаю тебе выбрать, что сегодня новенького мы попробуем?'}
      </header>
      <div className="App-content">
        {isReady ?
        <div className="App-result">
          <img
            className="App-result__image"
            src={position.image}
            alt="error"
          />
          <div className="App-result__description">
            {position.description}
          </div>
        </div> :
        <div className="App-chose">
          <p className="App-chose__title">
            Выбралось {filterPositions.length} позиций
          </p>
          <div className="App-chose__buttons">
            <button className="App-button" onClick={getRandomPosition}>
              Выбрать позу рандомно 
            </button>
            <button
              onClick={toggleParams}
              className="App-button"
            >
              {isParams ? 'Сбросить параметры' : 'Выбрать по параметрам'}
            </button>
          </div>
          {isParams ?
            <div className="App-chose__params">
              <div className="App-chose-params">
                <p className="App-chose-params__title">
                  Выбери место
                </p>
                <select
                  className="App-chose-params__select"
                  value={furnitue}
                  onChange={(event) => {
                    setFurniture(event.target.value)
                  }}
                >
                  <option></option>
                  {furnitureVariants.map((option, i) =>
                    <option key={i}>{option}</option>
                  )}
                </select>
              </div>
              <div className="App-chose-params">
                <p className="App-chose-params__title">
                  Выбери для кого поза
                </p>
                <select
                  className="App-chose-params__select"
                  value={forWho}
                  onChange={(event) => {
                    setForWho(event.target.value)
                  }}
                >
                  <option></option>
                  {forVariants.map((option, i) =>
                    <option key={i}>{option}</option>
                  )}
                </select>
              </div>
              <div className="App-chose-params">
                <p className="App-chose-params__title">
                  Выбери что будем использовать
                </p>
                <select
                  className="App-chose-params__select"
                  value={added}
                  onChange={(event) => {
                    setAdded(event.target.value)
                  }}
                >
                  <option></option>
                  {addedVariants.map((option, i) =>
                    <option key={i}>{option}</option>
                  )}
                </select>
              </div>
              <div className="App-chose-params">
                <p className="App-chose-params__title">
                  Выбери вид секса
                </p>
                <select
                  className="App-chose-params__select"
                  value={kind}
                  onChange={(event) => {
                    setKind(event.target.value)
                  }}
                >
                  <option></option>
                  {kindVariants.map((option, i) =>
                    <option key={i}>{option}</option>
                  )}
                </select>
              </div>
            </div> :
            <div className="App-chose__description">
              Ты можешь выбрать позу случайно.{' '}
              А можешь выбрать параметры, чего именно тебе сегодня хочется
            </div>
          }
        </div>  

        }
      </div>
      <footer className="App-footer">
        {isReady && <button className="App-button" onClick={onReset}>
          Заново
        </button>}
      </footer>
    </div>
  );
}

export default App;
