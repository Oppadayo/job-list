import React, { useState, useEffect } from "react";
import data from "./assets/data.json";
import JobBoardComponent from "./assets/components/JobBoardComponent";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setJobs(data);
  }, []);

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];

    if (languages) {
      tags.push(...languages);
    }

    if (tools) {
      tags.push(...tools);
    }

    return filters.every(filter => tags.includes(filter));
  };

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };

  const clearFilters = () => {
    setFilters([])
  }

  const filteredJobs = jobs.filter(filterFunc);

  

  return (
    <>
      <header className="bg-teal-500 mb-12">
        <img className="w-full" src="/images/bg-header-desktop.svg" alt="bg-img"/>
      </header>
      <div className="container m-auto">

      {filters.length > 0 && (
        
        <div className="flex bg-white shadow-md -my-20 mb-16 my-16 mx-10 p-6 rounded z-10 relative flex-wrap">
          {filters.map((filter) => (
          <span
            onClick={() => handleFilterClick(filter)} className="cursor-pointer mb-4 mr- p-2 rounded font-bold lg:mb-0">
              <span className="text-teal-500 bg-teal-100 p-2 rounded-tl rounded-bl">
              {filter}
              </span>
            
            <span className="bg-teal-500 text-teal-100 p-2 rounded-br rounded-tr">x</span>
          </span>
          ))}
          <button className="font-bold text-gray-700 ml-auto" onClick={clearFilters}>Clear</button>
        </div>
        
        
      )}

      {jobs.length === 0 ? (
        <p>Trabalhos carregando...</p>
      ) : (
        filteredJobs.map((job) => (
          <JobBoardComponent
            job={job}
            key={job.id}
            handleTagClick={handleTagClick}
          />
        ))
      )}
      </div>
    </>
  );
}

export default App;
