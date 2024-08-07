import React from 'react'

const Breadcrumb = ({ items, divider = '/' }) => {
    return (
      <nav style={{ '--bs-breadcrumb-divider': `'${divider}'` }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item${item.active ? ' active' : ''}`}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.active ? item.label : <a href={item.href}>{item.label}</a>}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  export default Breadcrumb;
