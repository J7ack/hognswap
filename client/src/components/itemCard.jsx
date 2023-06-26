import PropTypes from 'prop-types';

// itemCard() takes in an array of objects, and formats them into a card to be displayed and returned when needed

function itemCard(children) {
  return(
    <div className='itemCard'>{ children }</div>
  )
}

export default itemCard;