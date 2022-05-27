/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {mount} from '@cypress/react';
import * as stories from './index.stories';

// compile the "Simple" story with the library
const {Simple} = composeStories(stories);

describe('Pagination component', () => {
    describe('PREV button', () => {
        it('should be disabled when reaching the first page', () => {
            // and mount the story using @cypress/react library
            mount(<Simple />);

            const prevButton = cy.get('button').contains('PREV');

            prevButton.click();
            prevButton.click();
            prevButton.click();

            prevButton.should('be.disabled');
        });
    });
});
