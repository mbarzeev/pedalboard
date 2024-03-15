/**
 * Copyright (c) 2024-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import './index.stories.scss';
import MediaLoader from '../..';

const meta: Meta<typeof MediaLoader> = {
    component: MediaLoader,
};

export default meta;
type Story = StoryObj<typeof MediaLoader>;

export const ImagesColum: Story = {
    name: 'Images column',
    parameters: {},
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Images column</h1>
                <p>
                    In this scenario, there's a column of images, with some positioned below the visible area initially.
                    As you scroll down, you'll notice that these images begin to load as they enter the viewport. This
                    functionality is achieved through the implementation of the IntersectionObserver, offering precise
                    control over the timing of image loading.
                </p>
            </article>
            <div className="story-content media-column">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        const intersectionCallback = (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    let elem = entry.target;
                                    loadMedia(elem);
                                }
                            });
                        };
                        let options = {
                            rootMargin: '0px',
                            threshold: 1.0,
                        };
                        let observer = new IntersectionObserver(intersectionCallback, options);

                        mediaHTMLElementRefs.forEach((mediaHTMLElementRef) => {
                            let target = mediaHTMLElementRef.current;
                            if (target) {
                                observer.observe(target);
                            }
                        });
                    }}
                >
                    <img src="/assets/image-01.jpg" alt="image-01"></img>
                    <img src="/assets/image-02.jpg" alt="image-02"></img>
                    <img
                        src="/assets/image-03-error.jpg"
                        alt="Broken image 13"
                        onError={() => console.log('Error loading image 13')}
                    ></img>
                    <img src="/assets/image-04.jpg" alt="image-04"></img>
                    <img src="/assets/image-05.jpg" alt="image-05"></img>
                    <img src="/assets/image-06.jpg" alt="image-06"></img>
                    <div>Just a div in the middle</div>
                    <img src="/assets/image-07.jpg" alt="image-07"></img>
                    <img
                        src="/assets/image-08.jpg"
                        alt="image-08"
                        onLoad={() => console.log('image 18 has been loaded')}
                    ></img>
                    <div>
                        <img src="/assets/image-09.jpg" alt="image-09"></img>
                    </div>
                </MediaLoader>
            </div>
        </div>
    ),
};

export const ImagesAnimation: Story = {
    name: 'Images animation',
    parameters: {},
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Images animation</h1>
                <p>
                    In this demonstration, we've arranged three images in a stacked formation. Upon clicking on an
                    image, it initiates an animation that slides it to the right. Once its `left` CSS property surpasses
                    300, it activates the image loading process. Naturally, this functionality can be tailored to any
                    desired attribute or CSS property. To delve into the implementation, feel free to explore the code
                    provided.
                </p>
            </article>
            <div className="story-content media-animation">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        const monitor = (target) => {
                            const computedStyle = getComputedStyle(target.parentElement);
                            const currentLeft = parseFloat(computedStyle.left);
                            // If the image container reach a certain left then load it
                            if (currentLeft > 300) {
                                loadMedia(target);
                                return;
                            }

                            // Continue monitoring in the next frame
                            requestAnimationFrame(() => monitor(target));
                        };

                        mediaHTMLElementRefs.forEach((mediaHTMLElementRef) => {
                            let target = mediaHTMLElementRef.current;
                            if (target) {
                                requestAnimationFrame(() => monitor(target));
                            }
                        });
                    }}
                >
                    <div
                        className="image-container"
                        onClick={(event) => {
                            (event.target as HTMLDivElement).classList.add('animate-media');
                        }}
                    >
                        <img src="/assets/image-01.jpg" alt="image-09" className="run"></img>
                        <div>And now me</div>
                    </div>
                    <div
                        className="image-container"
                        onClick={(event) => {
                            (event.target as HTMLDivElement).classList.add('animate-media');
                        }}
                    >
                        <img src="/assets/image-02.jpg" alt="image-09" className="run"></img>
                        <div>Quick! Click me ;)</div>
                    </div>
                    <div
                        className="image-container"
                        onClick={(event) => {
                            (event.target as HTMLDivElement).classList.add('animate-media');
                        }}
                    >
                        <img src="/assets/image-03.jpg" alt="image-09" className="run"></img>
                        <div>Click me ;)</div>
                    </div>
                </MediaLoader>
            </div>
        </div>
    ),
};

export const ImagesGridSequence: Story = {
    name: 'Images grid sequence',
    parameters: {},
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Images grid sequence</h1>
                <p>
                    Wait for it...<br></br>
                    Here's an intriguing setup: a grid containing nine images, yet we're utilizing the MediaLoader to
                    selectively load only five of them. This is achieved by leveraging the `onload` event of each image
                    to trigger the loading of the next one, resulting in a seamless sequential loading sequence crafted
                    with minimal code. Quite elegant, isn't it?
                </p>
            </article>
            <div className="story-content media-grid">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        let index = 0;
                        function loadNextImage() {
                            const nextImageRef = mediaHTMLElementRefs.splice(index, 1)[0];
                            const target = nextImageRef?.current;
                            if (target) {
                                target.onload = loadNextImage;
                                index++;
                                setTimeout(() => {
                                    loadMedia(target);
                                }, 1000);
                            }
                        }

                        loadNextImage();
                    }}
                >
                    <img src="/assets/image-01.jpg" alt="image-01"></img>
                    <img src="/assets/image-02.jpg" alt="image-02"></img>
                    <img src="/assets/image-03.jpg" alt="image-03"></img>
                    <img src="/assets/image-04.jpg" alt="image-04"></img>
                    <img src="/assets/image-05.jpg" alt="image-05"></img>
                    <img src="/assets/image-06.jpg" alt="image-06"></img>
                    <img src="/assets/image-07.jpg" alt="image-07"></img>
                    <img src="/assets/image-08.jpg" alt="image-08"></img>
                    <div>
                        <img src="/assets/image-09.jpg" alt="image-09"></img>
                    </div>
                </MediaLoader>
            </div>
        </div>
    ),
};

export const ClickableVideosGrid: Story = {
    name: 'Clickable videos grid',
    parameters: {},
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Clickable videos grid</h1>
                <p>
                    In this demonstration, we've assembled a grid featuring a blend of videos and images. These media
                    files reside in a `div` container. We use the MediaLoader here to register a click handler to that
                    container, that once clicked will load the relevant media
                </p>
            </article>
            <div className="story-content media-grid">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        mediaHTMLElementRefs.forEach((mediaHTMLElementRef) => {
                            const target = mediaHTMLElementRef.current;
                            if (target) {
                                target?.parentElement?.addEventListener('click', () => {
                                    loadMedia(target);
                                });
                            }
                        });
                    }}
                >
                    <div className="media-container">
                        <img src="/assets/image-05.jpg" alt="image-05"></img>
                    </div>
                    <div className="media-container">
                        <video controls height="100" autoPlay>
                            <source src="/assets/video-01.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="media-container">
                        <img src="/assets/image-06.jpg" alt="image-06"></img>
                    </div>
                    <div className="media-container">
                        <video controls height="100" autoPlay>
                            <source src="/assets/video-01.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="media-container">
                        <img src="/assets/image-07.jpg" alt="image-07"></img>
                    </div>
                    <div className="media-container">
                        <img src="/assets/image-08.jpg" alt="image-08"></img>
                    </div>
                </MediaLoader>
            </div>
        </div>
    ),
};

export const VideosColumn: Story = {
    name: 'Videos column',
    parameters: {},
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Videos column</h1>
                <p>
                    In this scenario, there's a vertical arrangement of videos and images, with some positioned below
                    the visible area initially.
                    <br></br>
                    As you scroll down, you'll observe that the videos and images commence loading once they enter the
                    viewport. This functionality is achieved through the utilization of the IntersectionObserver,
                    providing precise control over the timing of media loading.
                </p>
            </article>
            <div className="story-content media-column">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        const intersectionCallback = (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    let elem = entry.target;
                                    loadMedia(elem);
                                }
                            });
                        };
                        let options = {
                            rootMargin: '0px',
                            threshold: 1.0,
                        };
                        let observer = new IntersectionObserver(intersectionCallback, options);

                        mediaHTMLElementRefs.forEach((mediaHTMLElementRef) => {
                            let target = mediaHTMLElementRef.current;
                            if (target) {
                                observer.observe(target);
                            }
                        });
                    }}
                >
                    <img src="/assets/image-01.jpg" alt="image-01"></img>
                    <img src="/assets/image-02.jpg" alt="image-02"></img>
                    <img src="/assets/image-03.jpg" alt="image-03"></img>
                    <video controls height="100" autoPlay>
                        <source src="/assets/video-01.mp4" type="video/mp4" />
                    </video>
                    <img src="/assets/image-04.jpg" alt="image-04"></img>
                    <img src="/assets/image-05.jpg" alt="image-05"></img>
                    <img src="/assets/image-06.jpg" alt="image-06"></img>
                    <video controls height="100" autoPlay src="/assets/video-01.mp4"></video>
                    <img src="/assets/image-07.jpg" alt="image-07"></img>
                    <img
                        src="/assets/image-08.jpg"
                        alt="image-08"
                        onLoad={() => console.log('image 18 has been loaded')}
                    ></img>
                    <div>
                        <img src="/assets/image-09.jpg" alt="image-09"></img>
                    </div>
                </MediaLoader>
            </div>
        </div>
    ),
};

export const AudiosColumn: Story = {
    name: 'Audios column',
    parameters: {},
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Audios column</h1>
                <p>
                    In this illustration, there's a vertical arrangement of audio files and images, with certain items
                    initially positioned below the visible area.
                    <br></br>
                    Upon scrolling down, you'll notice that the audio files and images begin loading as they come into
                    view. This functionality is implemented through the IntersectionObserver, granting precise control
                    over when the media content loads.
                </p>
            </article>
            <div className="story-content media-column">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        const intersectionCallback = (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    let elem = entry.target;
                                    loadMedia(elem);
                                }
                            });
                        };
                        let options = {
                            rootMargin: '0px',
                            threshold: 1.0,
                        };
                        let observer = new IntersectionObserver(intersectionCallback, options);

                        mediaHTMLElementRefs.forEach((mediaHTMLElementRef) => {
                            let target = mediaHTMLElementRef.current;
                            if (target) {
                                observer.observe(target);
                            }
                        });
                    }}
                >
                    <img src="/assets/image-01.jpg" alt="image-01"></img>
                    <img src="/assets/image-02.jpg" alt="image-02"></img>
                    <img src="/assets/image-03.jpg" alt="image-03"></img>
                    <img src="/assets/image-04.jpg" alt="image-04"></img>
                    <audio controls autoPlay>
                        <source src="/assets/audio-01.mp3" type="audio/mp3" />
                    </audio>
                    <img src="/assets/image-05.jpg" alt="image-05"></img>
                    <audio controls autoPlay src="/assets/audio-02.mp3"></audio>
                </MediaLoader>
            </div>
        </div>
    ),
};

export const ImagesGrid: Story = {
    name: 'Images grid',
    render: () => (
        <div className="story-container">
            <article className="story-docs">
                <h1>Images grid</h1>
                <p>
                    In this example, you're presented with a standard grid of images that load immediately. Clearly,
                    there's no requirement for the MediaLoader in this scenario. However, this serves as a demonstration
                    that you can maintain the default behavior with the component, although there's no compelling reason
                    to do so.
                </p>
            </article>
            <div className="story-content media-grid">
                <MediaLoader
                    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
                        mediaHTMLElementRefs.forEach((mediaHTMLElementRef) => {
                            let target = mediaHTMLElementRef.current;
                            if (target) {
                                loadMedia(target);
                            }
                        });
                    }}
                >
                    <img
                        src="/assets/image-01.jpg"
                        alt="image-01"
                        onLoad={() => console.log('image 11 has been loaded')}
                    ></img>
                    <img src="/assets/image-02.jpg" alt="image-02"></img>
                    <img
                        src="/assets/image-03-error.jpg"
                        alt="Broken image 13"
                        onError={() => console.log('Error loading image 13')}
                    ></img>
                    <img src="/assets/image-04.jpg" alt="image-04"></img>
                    <img src="/assets/image-05.jpg" alt="image-05"></img>
                    <img src="/assets/image-06.jpg" alt="image-06"></img>
                    <img src="/assets/image-07.jpg" alt="image-07"></img>
                    <img src="/assets/image-08.jpg" alt="image-08"></img>
                    <div>
                        <img src="/assets/image-09.jpg" alt="image-09"></img>
                    </div>
                </MediaLoader>
            </div>
        </div>
    ),
};
