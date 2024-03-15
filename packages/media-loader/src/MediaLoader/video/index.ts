/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Children, ReactElement, RefObject, cloneElement, createRef} from 'react';
import {MediaProcessor} from '../types';

export class VideoProcessor implements MediaProcessor {
    getProcessedChildren(child: ReactElement): [ReactElement, RefObject<HTMLVideoElement>] {
        const videoRef = createRef<HTMLVideoElement>();
        let videoElement = child;
        if (child?.props?.children) {
            const sourceChildren = Children.toArray(child.props.children) as ReactElement[];
            videoElement = cloneElement(child, {
                style: {visibility: 'hidden'},
                ref: videoRef,
                children: sourceChildren.map((sourceChild) => {
                    return cloneElement(sourceChild, {
                        'data-src': sourceChild.props.src,
                        src: null,
                    });
                }),
            });
        } else if (child?.props?.src) {
            videoElement = cloneElement(child, {
                style: {visibility: 'hidden'},
                ref: videoRef,
                'data-src': child.props.src,
                src: null,
            });
        }

        return [videoElement, videoRef];
    }

    loadMedia(htmlVideoElement: HTMLVideoElement): void {
        htmlVideoElement.setAttribute('style', 'visibility: "visible"');
        const videoElementChildren = Array.from(htmlVideoElement.children);
        if (Array.isArray(videoElementChildren) && videoElementChildren.length) {
            for (const child of htmlVideoElement.children) {
                if (child instanceof HTMLSourceElement) this.enableMediaByElement(child);
            }
        } else {
            this.enableMediaByElement(htmlVideoElement);
        }
    }

    enableMediaByElement(element: HTMLVideoElement | HTMLSourceElement) {
        if (element.hasAttribute('data-src')) {
            element.setAttribute('src', element.getAttribute('data-src') as string);
            element.removeAttribute('data-src');
            if (element instanceof HTMLVideoElement) {
                element.load();
            } else if (element instanceof HTMLSourceElement && element.parentElement instanceof HTMLVideoElement) {
                element.parentElement.load();
            }
        }
    }
}
