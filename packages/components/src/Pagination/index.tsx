/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {usePagination} from '@pedalboard/hooks';
import './index.css';

export interface PaginationProps {
    totalPages: number;
    initialCursor: number;
    pagesBuffer: number;
    onChange: () => void;
}

const Pagination = (props: PaginationProps) => {
    const {cursor, totalPages, goPrev, goNext} = usePagination(props);
    const buffer = new Array(props.pagesBuffer).fill(0);
    let bufferGap = 0;
    if (totalPages - cursor < buffer.length) {
        bufferGap = totalPages - cursor - buffer.length;
    }

    return (
        <div>
            <button onClick={goPrev} disabled={cursor === 0}>
                PREV
            </button>
            {buffer.map((item, index) => {
                const pageCursor = cursor + index + bufferGap;
                const className = pageCursor === cursor ? 'selected' : '';

                return pageCursor >= 0 && pageCursor < totalPages ? (
                    <span key={`page-${pageCursor}`} className={className}>
                        {` [${pageCursor}] `}
                    </span>
                ) : null;
            })}
            <button onClick={goNext} disabled={cursor === totalPages - 1}>
                NEXT
            </button>
        </div>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.number,
    pagesBuffer: PropTypes.number,
    initialCursor: PropTypes.number,
    onChange: PropTypes.func,
};

export default Pagination;
