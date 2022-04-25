import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  // Input is a custome component so to make refs work I had to  
  // wrap the component function (where I want to receive refs) with React.forwardRef
  // So that component function is now an argument to forwardRef
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value; // it returns a string number
    const enteredAmountNumber = +enteredAmount; // this convert string number into a number

    if (
      enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 || 
      enteredAmountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
