/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import Pagination from '.';

const meta: Meta<typeof Pagination> = {
    title: 'Components/Pagination',
    component: Pagination,
    argTypes: {
        onChange: {action: 'Page changed'},
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Simple: Story = {
    render: (args) => (
        <div>
            <Pagination {...args} />
        </div>
    ),
    args: {
        totalPages: 10,
        initialCursor: 3,
        pagesBuffer: 5,
    },
};
