import React from 'react';

const Card2 = ({props}) => {
  return (
    <div className="bg-[#ccc] w-3/4 my-2 rounded-lg">
      <div className="flex p-2 gap-1">
        <div className="circle">
          <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full" />
        </div>
        <div className="circle">
          <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full" />
        </div>
        <div className="circle">
          <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
            <h1 className="text-xl text-center font-bold">{props.title}</h1>
            <div className="flex justify-start bg-[#fff] rounded-lg p-2 m-2">
                <pre className="text-gray-600 overflow-x-auto">{props.description}</pre>
            </div>
            <p className="text-gray-500 text-center">{props.date}</p>
        </div>
      </div>
    </div>
  );
}

export default Card2;
