/**
 * Copyright (c) 2025-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Meta, StoryObj} from '@storybook/react';
import {{ComponentName}} from '.';

const meta: Meta<typeof {{ComponentName}}> = {
    title: 'Components/{{ComponentName}}',
    component: {{ComponentName}},
};

export default meta;
type Story = StoryObj<typeof {{ComponentName}}>;

export const Default: Story = {
    args: {
        title: 'Hello World',
    },
};
