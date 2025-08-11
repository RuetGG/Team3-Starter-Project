import React, { ReactNode } from "react";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  name?: string;
  role?: string;
  children?: ReactNode;
}

function Card({ title, description, image, name, role, children }: Props) {
  return (
    <div className="card bg-base-100 max-w-[300px] shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body text-black">
        {/* Quote / Main Content */}
        {description && (
          <p className="mb-4 text-sm leading-relaxed">{description}</p>
        )}
        {children}

        {/* User Info */}
        <ul className="list  rounded-box ">
          <li className="list-row flex items-center gap-3">
            {image && (
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={image}
                alt={name || "Profile"}
              />
            )}
            <div>
              <div className="font-semibold">{name || "Unknown"}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {role || "Alumni"}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
