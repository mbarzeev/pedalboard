import React from 'react';
import PropTypes from 'prop-types';
import usePagination from './use-pagination-hook';
import './index.css';

const Pagination = (props) => {
    const [cursor, pagesCount, goPrev, goNext] = usePagination(props);
    const buffer = new Array(props.pagesBuffer).fill(0);
    let bufferGap = 0;
    if (pagesCount - cursor < buffer.length) {
        bufferGap = pagesCount - cursor - buffer.length;
    }

    return (
        <div>
            <button onClick={goPrev} disabled={cursor === 0}>
                PREV
            </button>
            {buffer.map((item, index) => {
                const pageCursor = cursor + index + bufferGap;
                const className = pageCursor === cursor ? 'selected' : '';

                return pageCursor >= 0 && pageCursor < pagesCount ? (
                    <span key={`page-${pageCursor}`} className={className}>
                        {` [${pageCursor}] `}
                    </span>
                ) : null;
            })}
            <button onClick={goNext} disabled={cursor === pagesCount - 1}>
                NEXT
            </button>
        </div>
    );
};

Pagination.propTypes = {
    pagesBuffer: PropTypes.number,
};

export default Pagination;
