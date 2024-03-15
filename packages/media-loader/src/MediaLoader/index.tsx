/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {Children, ReactElement, ReactNode, RefObject, cloneElement, useEffect, useRef} from 'react';
import {ImageProcessor} from './image';
import {MediaHTMLElement, MediaProcessor} from './types';
import {VideoProcessor} from './video';
import {AudioProcessor} from './audio';

const MEDIA_TYPE = {
    IMG_MEDIA_TYPE: 'img',
    VIDEO_MEDIA_TYPE: 'video',
    AUDIO_MEDIA_TYPE: 'audio',
} as const;

const MEDIA_TAG = {
    IMG: 'IMG',
    VIDEO: 'VIDEO',
    AUDIO: 'AUDIO',
} as const;

interface MediaLoaderProps {
    children: ReactNode;
    loadingStrategy: (
        mediaHTMLElements: RefObject<MediaHTMLElement>[],
        loadMedia: (mediaHTMLElement: MediaHTMLElement) => void
    ) => void;
}

const imageProcessor = new ImageProcessor();
const videoProcessor = new VideoProcessor();
const audioProcessor = new AudioProcessor();

type MediaTypeKey = (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE];
type MediaTagKey = (typeof MEDIA_TAG)[keyof typeof MEDIA_TAG];

const mediaTypeToProcessor: Record<MediaTypeKey, MediaProcessor> = {
    [MEDIA_TYPE.IMG_MEDIA_TYPE]: imageProcessor,
    [MEDIA_TYPE.VIDEO_MEDIA_TYPE]: videoProcessor,
    [MEDIA_TYPE.AUDIO_MEDIA_TYPE]: audioProcessor,
};

const mediaTagToProcessor: Record<MediaTagKey, MediaProcessor> = {
    [MEDIA_TAG.IMG]: imageProcessor,
    [MEDIA_TAG.VIDEO]: videoProcessor,
    [MEDIA_TAG.AUDIO]: audioProcessor,
};

const MediaLoader = ({children, loadingStrategy: triggerFunction}: MediaLoaderProps) => {
    const mediaHTMLElements = useRef<RefObject<MediaHTMLElement>[]>([]);

    const getChildren = (currentChildren: ReactNode): ReactElement[] => {
        const childrenArray = Children.toArray(currentChildren) as ReactElement[];
        const mediaChildren = Children.map(childrenArray, (child) => {
            const mediaProcessor = mediaTypeToProcessor[child.type as MediaTypeKey];
            if (mediaProcessor) {
                const [element, ref] = mediaProcessor.getProcessedChildren(child);
                mediaHTMLElements.current.push(ref);
                return element;
            } else {
                let result = child;
                if (child?.props?.children) {
                    result = cloneElement(child, {
                        children: getChildren(child.props.children),
                    });
                }
                return result;
            }
        });

        return mediaChildren;
    };

    useEffect(() => {
        if (triggerFunction) {
            triggerFunction(mediaHTMLElements.current, loadMedia);
        }
    }, []);

    return <>{getChildren(children)}</>;
};

const loadMedia = (mediaHTMLElement: MediaHTMLElement) => {
    const mediaProcessor = mediaTagToProcessor[mediaHTMLElement.tagName as MediaTagKey];
    if (mediaProcessor) {
        mediaProcessor.loadMedia(mediaHTMLElement);
    }
};

export default MediaLoader;
