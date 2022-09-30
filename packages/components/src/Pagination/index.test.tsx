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
                pagesBuffer={7}
                totalPages={10}
                initialCursor={3}
                onChange={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        );
        expect(getByText('[5]')).toBeInTheDocument();
        expect(getByText('PREV')).toBeInTheDocument();
        expect(getByText('NEXT')).toBeInTheDocument();
    });
});
