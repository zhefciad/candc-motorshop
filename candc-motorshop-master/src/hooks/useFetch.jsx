import { useState, useEffect } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
  const [dataFetch, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [trigger, setTrigger] = useState(0); // <-- new state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeRequest.get(url);
        setData(response.data.data);
      } catch (err) {
        console.log(err, "ERRO!@");
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [url, trigger]); // <-- added trigger to dependencies

  const refetch = () => setTrigger(prev => prev + 1); // <-- new function to re-trigger fetch

  return { dataFetch, loadingOrder: loading, error, refetch }; // <-- return refetch
};

export default useFetch;
