import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const PlusMinusButtons = ({ counter, handleIncrement, handleDecrement }) => {
	const displayCounter = counter > 0;

	return (
		<ButtonGroup size="small" aria-label="small outlined button group">
			<Button onClick={handleIncrement}>+</Button>
			{/* {displayCounter && <Button disabled>{counter}</Button>}
			{displayCounter && <Button onClick={handleDecrement}>-</Button>} */}
			<Button disabled>{counter}</Button>
			<Button onClick={handleDecrement}>-</Button>
		</ButtonGroup>
	);
};

export default PlusMinusButtons;
