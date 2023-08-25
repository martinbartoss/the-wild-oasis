// import { useSearchParams } from "react-router-dom";

// export function useUrl() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   function url(sortBy) {
//     return searchParams.get(sortBy);
//   }

//   function setUrl(sortBy, e) {
//     searchParams.set(sortBy, e.target.value);
//     setSearchParams(searchParams);
//   }

//   return { url, setUrl };
// }

import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function useUrl() {
  // Get the search params and the setter function from the hook
  const [searchParams, setSearchParams] = useSearchParams();

  // Memoize the url function to prevent unnecessary rerenders
  const url = useMemo(() => {
    // Return a function that takes a sortBy parameter and returns the corresponding value from the search params
    return (sortBy) => {
      return searchParams.get(sortBy || "");
    };
  }, [searchParams]);

  // Define the setUrl function that takes a sortBy and an event parameter
  function setUrl(sortBy, value) {
    // Try to set the search param with the given value
    try {
      searchParams.set(sortBy, value);
      setSearchParams(searchParams);
    } catch (error) {
      // Handle any possible errors
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  }

  // Return the url and setUrl functions
  return { url, setUrl };
}
