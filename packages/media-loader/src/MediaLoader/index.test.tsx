/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {render} from '@testing-library/react';
import MediaLoader from '.';

describe('MediaLoader component', () => {
    beforeAll(() => {
        // HTMLMediaElement is not currently supported in JSDom
        window.HTMLMediaElement.prototype.load = () => {
            /* do nothing */
        };
    });

    it('should disable the immediate loading of images wrapped with it', () => {
        const {queryAllByRole} = render(
            <div>
                <MediaLoader>
                    <img src="/assets/image-01.jpg" alt="image-01"></img>
                    <div>
                        <img src="/assets/image-09.jpg" alt="image-09"></img>
                    </div>
                </MediaLoader>
            </div>
        );

        const images = queryAllByRole('img', {hidden: true});
        expect(images).toHaveLength(2);
        images.forEach((singleImage) => {
            expect(singleImage.dataset['src']).toBeDefined();
        });
    });

    it('should disable the immediate loading of videos wrapped with it', () => {
        const {getAllByRole} = render(
            <div>
                <MediaLoader>
                    <div className="media-container">
                        <video role="video" controls height="100" autoPlay>
                            <source role="source" src="/assets/video-01.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <video role="video" controls height="100" autoPlay src="/assets/video-01.mp4"></video>
                </MediaLoader>
            </div>
        );

        const videos = getAllByRole('video', {hidden: true});
        expect(videos).toHaveLength(2);
        expect(videos[1].dataset['src']).toBeDefined();
        const sources = getAllByRole('source', {hidden: true});
        expect(sources[0].dataset['src']).toBeDefined();
    });

    it('should disable the immediate loading of audios wrapped with it', () => {
        const {getAllByRole} = render(
            <div>
                <MediaLoader>
                    <div className="media-container">
                        <audio role="audio" controls autoPlay>
                            <source role="source" src="/assets/audio-01.mp3" type="audio/mp3" />
                        </audio>
                    </div>
                    <audio role="audio" controls autoPlay src="/assets/audio-02.mp3"></audio>
                </MediaLoader>
            </div>
        );

        const audios = getAllByRole('audio', {hidden: true});
        expect(audios).toHaveLength(2);
        expect(audios[1].dataset['src']).toBeDefined();
        const sources = getAllByRole('source', {hidden: true});
        expect(sources[0].dataset['src']).toBeDefined();
    });

    it('should load the images, videos and audios when a triggerFunction is defined', (done) => {
        const {getByRole} = render(
            <div>
                <MediaLoader
                    triggerFunction={(mediaHTMLElements, loadMedia) => {
                        // We're using setTimeout here since JSDom does not act
                        // like a real browser
                        setTimeout(() => {
                            mediaHTMLElements.forEach((mediaHTMLElementRef) => {
                                let target = mediaHTMLElementRef.current;
                                loadMedia(target);
                            });
                        });
                    }}
                >
                    <img src="/assets/image-01.jpg"></img>
                    <video role="video" controls height="100" autoPlay src="/assets/video-01.mp4"></video>
                    <audio role="audio" controls autoPlay src="/assets/audio-02.mp3"></audio>
                </MediaLoader>
            </div>
        );

        setTimeout(() => {
            const imageElement = getByRole('img');
            expect(imageElement).toBeVisible();
            expect(imageElement.getAttribute('src')).toBeDefined();
            const audioElement = getByRole('audio');
            expect(audioElement).toBeVisible();
            expect(audioElement.getAttribute('src')).toBeDefined();
            const videoElement = getByRole('video');
            expect(videoElement).toBeVisible();
            expect(videoElement.getAttribute('src')).toBeDefined();
            done();
        });
    });

    it('should load the videos and audios with source tags when a triggerFunction is defined', (done) => {
        const {getByRole} = render(
            <div>
                <MediaLoader
                    triggerFunction={(mediaHTMLElements, loadMedia) => {
                        // We're using setTimeout here since JSDom does not act
                        // like a real browser
                        setTimeout(() => {
                            mediaHTMLElements.forEach((mediaHTMLElementRef) => {
                                let target = mediaHTMLElementRef.current;
                                loadMedia(target);
                            });
                        });
                    }}
                >
                    <video role="video" controls height="100" autoPlay>
                        <source role="source" src="/assets/video-01.mp4" type="video/mp4" />
                    </video>
                    <audio role="audio" controls autoPlay>
                        <source role="source" src="/assets/audio-01.mp3" type="audio/mp3" />
                    </audio>
                </MediaLoader>
            </div>
        );

        setTimeout(() => {
            const audioElement = getByRole('audio');
            expect(audioElement).toBeVisible();
            expect(audioElement.getAttribute('src')).toBeDefined();
            const videoElement = getByRole('video');
            expect(videoElement).toBeVisible();
            expect(videoElement.getAttribute('src')).toBeDefined();
            done();
        });
    });
});
