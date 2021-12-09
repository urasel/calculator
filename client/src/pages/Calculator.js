import React, {useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faAnchor, faGasPump, faCheckSquare } from '@fortawesome/fontawesome-free-solid'


function Calculator() {

    
    // Declaration of variables
    const [operandOne, setNumberOne] = useState(0);
    const [operandTwo, setNumberTwo] = useState(0);
    const [total, setTotal] = useState(0);
    const [errorMessage, setMessage] =  useState('');
    

    //Handle the operation
    const onchange = (data) => {
        let operator = data.value;
        calculateTotal(operator);
    }

    //Call the server with variables for calcualtion
    const calculateTotal = (operator) => {
        const data = new FormData();
        data.append('operandOne', operandOne);
        data.append('operandTwo', operandTwo);
        data.append('operatorSymbol', operator);
        axios.post("http://127.0.0.1:8080/api/calculate", data).then( res => {
            if(res.data.status === 200)
            {
                setTotal(res.data.result);
                setMessage(res.data.message);
            }else{
                setMessage(res.data.message)
            }
        })
        .catch((error) => {
            console.error(error);
        });
        
    }


    // Code for listing operator and Icons
    const operators = [
    {
        value: '',
        text: 'Select Operator',
        icon: ''
    },
    {
        value: 'Add',
        text: 'Add',
        icon: <FontAwesomeIcon icon={faAnchor} />
    },
    {
        value: 'Subtract',
        text: 'Subtract',
        icon: <FontAwesomeIcon icon={faSkull} />
    },
    {
        value: 'Multiply',
        text: 'Multiply',
        icon: <FontAwesomeIcon icon={faGasPump} />
    },
    {
        value: 'Divide',
        text: 'Divide',
        icon: <FontAwesomeIcon icon={faCheckSquare} />
    }
    ];
     
  return (
    <div className="App">
      <h1>Emoji Calculator</h1>
      <h3 className="error"> { errorMessage } </h3><br/>
      <div className="number-inputs">
        <input
          type="number"
          value={operandOne}
          onChange={(e) => setNumberOne(+e.target.value)}
          placeholder="0"
        />
        <input
          type="number"
          value={operandTwo}
          onChange={(e) => setNumberTwo(+e.target.value)}
          placeholder="0"
        />
        <Select
            placeholder="Select Option"
            options={operators}
            onChange={(e) => onchange(e)}
            getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {e.icon}
                <span style={{ marginLeft: 5 }}>{e.text}</span>
            </div>
            )}
        />
      </div>
      <div className="result">
        <h2>{total}</h2>
      </div>
    </div>
  );
}

export default Calculator;
