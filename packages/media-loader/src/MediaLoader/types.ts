/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ReactElement, RefObject} from 'react';

export type MediaHTMLElement = HTMLImageElement | HTMLMediaElement;

export interface MediaProcessor {
    getProcessedChildren(child: ReactElement): [ReactElement, RefObject<MediaHTMLElement>];
    loadMedia(mediaHTMLElement: MediaHTMLElement): void;
}
