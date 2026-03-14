/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {render} from '@testing-library/react';
import Pagination from '.';

describe('Pagination component', () => {
    it('should render', () => {
        const {getByText} = render(
            <Pagination
                pagesBuffer={5}
                totalPages={10}
                initialCursor={3}
                onChange={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />,
        );
        expect(getByText('[5]')).toBeInTheDocument();
        expect(getByText('PREV')).toBeInTheDocument();
        expect(getByText('NEXT')).toBeInTheDocument();
    });

    it('should shift the buffer back when the cursor is near the end of the pages', () => {
        // cursor=8, pagesBuffer=5, totalPages=10:
        // totalPages - cursor = 2 < buffer.length = 5 → bufferGap = -3
        // buffer renders pages 5,6,7,8,9 instead of starting at cursor
        const {getByText, queryByText} = render(
            <Pagination
                pagesBuffer={5}
                totalPages={10}
                initialCursor={8}
                onChange={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />,
        );
        // Pages before the cursor should be visible (buffer shifted back)
        expect(getByText('[5]')).toBeInTheDocument();
        expect(getByText('[6]')).toBeInTheDocument();
        expect(getByText('[7]')).toBeInTheDocument();
        expect(getByText('[8]')).toBeInTheDocument();
        expect(getByText('[9]')).toBeInTheDocument();
        // No page beyond totalPages should appear
        expect(queryByText('[10]')).not.toBeInTheDocument();
    });
});
