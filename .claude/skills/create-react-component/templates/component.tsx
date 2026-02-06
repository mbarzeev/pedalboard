/**
 * Copyright (c) 2025-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './index.scss';

export interface {{ComponentName}}Props {
    title: string;
}

const {{ComponentName}} = ({title}: {{ComponentName}}Props) => {
    return (
        <div className="{{component-name}}">
            <span>{title}</span>
        </div>
    );
};

export default {{ComponentName}};
