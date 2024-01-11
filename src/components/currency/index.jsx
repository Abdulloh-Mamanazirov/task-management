import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Down, Up, USA_flag, RU_flag, EURO_flag } from "../../assets";

function CurrencyCard({ img, title, rate, diff }) {
  return (
    <div className="pb-1 flex items-center gap-3 md:gap-6">
      <img
        src={img}
        alt="flag"
        width={35}
        className="aspect-square object-cover rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="text-lg font-medium">{title}</p>
          <p>=</p>
          <p className="text-[17px]">{rate}</p>
        </div>
        {diff?.startsWith("-") ? (
          <div className="flex items-center">
            <p className="text-red-500">{diff}</p>
            <img src={Down} alt="down rate" className="w-12" />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-green-500">+{diff}</p>
            <img src={Up} alt="up rate" className="w-12" />
          </div>
        )}
      </div>
    </div>
  );
}

const index = () => {
  const currencyWrapper = useRef();
  const [USD, setUSD] = useState(null);
  const [RUB, setRUB] = useState(null);
  const [EUR, setEUR] = useState(null);

  useEffect(() => {
    getCurrency();
  }, []);

  async function getCurrency() {
    const usd = await axios.get(
      "https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/"
    );
    setUSD(usd?.data?.[0]);
    const eur = await axios.get(
      "https://cbu.uz/uz/arkhiv-kursov-valyut/json/EUR/"
    );
    setEUR(eur?.data?.[0]);
    const rub = await axios.get(
      "https://cbu.uz/uz/arkhiv-kursov-valyut/json/RUB/"
    );
    setRUB(rub?.data?.[0]);
  }

  function scrollWrapper() {
    setTimeout(() => {
      currencyWrapper.current.childNodes[0].classList.remove("hidden");
      currencyWrapper.current.childNodes[1].classList.add("hidden");
      currencyWrapper.current.childNodes[2].classList.add("hidden");
    }, 4000);
    setTimeout(() => {
      currencyWrapper.current.childNodes[0].classList.add("hidden");
      currencyWrapper.current.childNodes[1].classList.remove("hidden");
      currencyWrapper.current.childNodes[2].classList.add("hidden");
    }, 8000);
    setTimeout(() => {
      currencyWrapper.current.childNodes[0].classList.add("hidden");
      currencyWrapper.current.childNodes[1].classList.add("hidden");
      currencyWrapper.current.childNodes[2].classList.remove("hidden");
    }, 12000);
  }
  useEffect(() => {
    setInterval(() => {
      scrollWrapper();
    }, 12000);
    scrollWrapper();
  }, []);

  if (USD?.Ccy) {
    return (
      <div
        ref={currencyWrapper}
        className="max-h-[66px] py-1 overflow-y-hidden"
      >
        <CurrencyCard
          img={USA_flag}
          title={USD?.Ccy}
          rate={USD?.Rate}
          diff={USD?.Diff}
        />
        <CurrencyCard
          img={RU_flag}
          title={RUB?.Ccy}
          rate={RUB?.Rate}
          diff={RUB?.Diff}
        />
        <CurrencyCard
          img={EURO_flag}
          title={EUR?.Ccy}
          rate={EUR?.Rate}
          diff={EUR?.Diff}
        />
      </div>
    );
  }
};

export default index;
