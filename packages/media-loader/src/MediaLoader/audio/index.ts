/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Children, ReactElement, RefObject, cloneElement, createRef} from 'react';
import {MediaProcessor} from '../types';

export class AudioProcessor implements MediaProcessor {
    getProcessedChildren(child: ReactElement): [ReactElement, RefObject<HTMLAudioElement>] {
        const audioRef = createRef<HTMLAudioElement>();
        let audioElement = child;
        if (child?.props?.children) {
            const sourceChildren = Children.toArray(child.props.children) as ReactElement[];
            audioElement = cloneElement(child, {
                style: {visibility: 'hidden'},
                ref: audioRef,
                children: sourceChildren.map((sourceChild) => {
                    return cloneElement(sourceChild, {
                        'data-src': sourceChild.props.src,
                        src: null,
                    });
                }),
            });
        } else if (child?.props?.src) {
            audioElement = cloneElement(child, {
                style: {visibility: 'hidden'},
                ref: audioRef,
                'data-src': child.props.src,
                src: null,
            });
        }

        return [audioElement, audioRef];
    }

    loadMedia(htmlAudioElement: HTMLAudioElement): void {
        htmlAudioElement.setAttribute('style', 'visibility: "visible"');
        const audioElementChildren = Array.from(htmlAudioElement.children);
        if (Array.isArray(audioElementChildren) && audioElementChildren.length) {
            for (const child of htmlAudioElement.children) {
                if (child instanceof HTMLSourceElement) this.enableMediaByElement(child);
            }
        } else {
            this.enableMediaByElement(htmlAudioElement);
        }
    }

    enableMediaByElement(element: HTMLAudioElement | HTMLSourceElement) {
        if (element.hasAttribute('data-src')) {
            element.setAttribute('src', element.getAttribute('data-src') as string);
            element.removeAttribute('data-src');
            if (element instanceof HTMLAudioElement) {
                element.load();
            } else if (element instanceof HTMLSourceElement && element.parentElement instanceof HTMLAudioElement) {
                element.parentElement.load();
            }
        }
    }
}
