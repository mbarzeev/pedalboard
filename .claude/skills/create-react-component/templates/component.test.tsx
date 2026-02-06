/**
 * Copyright (c) 2025-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {render} from '@testing-library/react';
import {{ComponentName}} from '.';

describe('{{ComponentName}} component', () => {
    it('should render', () => {
        const {getByText} = render(<{{ComponentName}} title="Hello World" />);
        expect(getByText('Hello World')).toBeInTheDocument();
    });
});
