// import React from "react";
// interface Props {
//   image: string;
// }

// function CardJourney() {
//   return (
//     <li className="w-64 p-4 bg-base-100 rounded-lg shadow-sm flex flex-col gap-3">
//       {/* Top row: image + name/title */}
//       <div className="flex gap-3">
//         <img
//           className="w-10 h-10  object-cover"
//           src="https://img.daisyui.com/images/profile/demo/1@94.webp"
//           alt="Dio Lupa"
//         />
//         {/* Description */}

//         <div>
//           <div className="font-normal text-base">Phase 1: Foundations</div>
//           <p className="text-xs leading-relaxed text-gray-700 flex-initial">
//             Master data structures, algorithms, and problem- solving techniques
//             in an intensive 3-month bootcamp.
//           </p>
//         </div>
//       </div>
//     </li>
//   );
// }

// export default CardJourney;

import React from "react";

interface Props {
  image: string;
  title?: string;
  description?: string;
}

const CardJourney: React.FC<Props> = ({ image, title, description }) => {
  return (
    <li className="w-64 p-4 bg-base-100 rounded-lg shadow-sm flex flex-col gap-3">
      <div className="flex gap-3">
        <img
          className="w-10 h-10 object-cover rounded-full"
          src={image}
          alt={title}
        />
        <div>
          <div className="font-normal text-base">{title}</div>
          <p className="text-xs leading-relaxed text-gray-700 flex-initial">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};

export default CardJourney;
