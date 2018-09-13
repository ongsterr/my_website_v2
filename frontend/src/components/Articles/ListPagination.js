import React from 'react';

const ListPagination = ({ articlesCount, onSetPage, currentPage }) => {
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); i++) {
    range.push(i);
  }

  const setPage = page => onSetPage(page);

  const pagination = range.map(v => {
    const isCurrent = v === currentPage;
    const onClick = ev => {
      ev.preventDefault();
      setPage(v);
    };
    return (
      <li
        className={isCurrent ? 'page-item active' : 'page-item'}
        onClick={onClick}
        key={v.toString()}>
        <a href="" className="page-link">
          {v + 1}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ul className="pagination">{pagination}</ul>
    </nav>
  );
};

export default ListPagination;
