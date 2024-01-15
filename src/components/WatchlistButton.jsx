import { useDispatch } from 'react-redux';
import {
  addWatchlistItem,
  deleteWatchlistItem
} from '../features/favs/watchlistSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock as solidClock } from '@fortawesome/free-solid-svg-icons';
import { faClock as outlineClock } from '@fortawesome/free-regular-svg-icons';

function WatchlistButton({ movieObj, isOnWatchlist }) {
  const dispatch = useDispatch();

  function handleWatchlistClick() {
    if (isOnWatchlist === true) {
      dispatch(deleteWatchlistItem(movieObj));
    } else {
      dispatch(addWatchlistItem(movieObj));
    }
  }

  const watchListBtn = isOnWatchlist ? (
    <FontAwesomeIcon
      icon={solidClock}
      className="clock solid-clock"
      onClick={handleWatchlistClick}
    />
  ) : (
    <FontAwesomeIcon
      icon={outlineClock}
      className="clock outline-clock"
      onClick={handleWatchlistClick}
    />
  );

  return <>{watchListBtn}</>;
}

};

export default WatchlistButton;
