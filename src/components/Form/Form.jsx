import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [select, setSelect] = useState('');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      select,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, select, street]);

  useEffect(() => {
    tg.WebApp.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.WebApp.offEvent('mainButtonClicked', onSendData);
    };
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'send data',
    });
  }, [tg]);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  return (
    <div className="form">
      <h3>Input your data</h3>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="input" placeholder="country" />
      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="input" placeholder="street" />
      <select value={select} onChange={(e) => setSelect(e.target.value)} className="select">
        <option value="one">One</option>
        <option value="two">Two</option>
      </select>
    </div>
  );
};

export default Form;
