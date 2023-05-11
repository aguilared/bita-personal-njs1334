import { useEffect, useState } from "react";
import getCountries from "../services/getCountries";

export function useCountries() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(
    function () {
      setLoading(true);
      getCountries().then((countries) => {
        setLoading(false);
        setCountries(countries.countries);
      });
    },
    [setCountries],
  );

  return { loading, countries };
}
