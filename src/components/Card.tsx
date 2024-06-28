import React from 'react';
import LazyImage from '@components/LazyImage';
import placeholder from '@/imgs/placeholder.png';

interface CardProps {
  header: string;
  subheader?: string;
  avatar: string;
  href: string;
  name: string;
  children?: React.ReactNode; // 定义 children 属性的类型为 React.ReactNode
}

const Card: React.FC<CardProps> = ({ header, avatar, href, name, children }) => {
  return (
    <div className="card bg-light">
      <h4 className="header-lg center-text">{header}</h4>
      <LazyImage
        className="avatar"
        src={avatar}
        alt={`Avatar for ${name}`}
        placeholder={placeholder}
      />
      <h2 className="center-text">
        <a className="link" href={href}>
          {name}
        </a>
      </h2>
      <ul className="card-list">{children}</ul>
    </div>
  );
};

export default Card;
