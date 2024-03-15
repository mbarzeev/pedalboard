/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ReactElement, RefObject, cloneElement, createRef} from 'react';
import {MediaProcessor} from '../types';

export class ImageProcessor implements MediaProcessor {
    getProcessedChildren(child: ReactElement): [ReactElement, RefObject<HTMLImageElement>] {
        const imgRef = createRef<HTMLImageElement>();
        const imgElement = cloneElement(child, {
            'data-src': child.props.src,
            src: null,
            style: {visibility: 'hidden'},
            ref: imgRef,
            alt: child.props.alt || '',
        });

        return [imgElement, imgRef];
    }

    loadMedia(htmlImageElement: HTMLImageElement): void {
        if (htmlImageElement.hasAttribute('data-src')) {
            htmlImageElement.setAttribute('style', 'visibility: "visible"');
            htmlImageElement.setAttribute('src', htmlImageElement.getAttribute('data-src') as string);
            htmlImageElement.removeAttribute('data-src');
        }
    }
}
