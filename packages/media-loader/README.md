# media-loader

Take control over your media loading 💪

MediaLoader is a versatile React component that provides fine-grained control over the loading of media assets such as images, videos, and audio files. It offers a customizable loading strategy, allowing developers to prioritize resources and optimize user experience.

With MediaLoader, you can effortlessly manage the loading process, dynamically loading media content based on user interactions, viewport visibility and much more. Whether you're building a gallery, a multimedia-rich website, or an application with heavy media content, MediaLoader empowers you to deliver a seamless and performant user experience.

MediaLoader is designed to be as non-intrusive as possible, seamlessly integrating into your existing React applications without imposing a heavy footprint. It provides a lightweight wrapper around your current media, without requiring a complete overhaul of your codebase.


## Installation

You can install MediaLoader via npm or yarn. Make sure you have Node.js and npm (or yarn) installed on your machine before proceeding.

### yarn
```bash
yarn add @pedalboard/media-loader
```

### npm

```bash
npm install @pedalboard/media-loader
```


## Usage example
In order to have the MediaLoader take control you need to wrap the media you want to control with it.<br>
So say you have this JSX:
```jsx
<img src="/assets/image-04.jpg" alt="image-04"></img>
<img src="/assets/image-05.jpg" alt="image-05"></img>
<img src="/assets/image-06.jpg" alt="image-06"></img>
<div>
    <img src="/assets/image-09.jpg" alt="image-09"></img>
</div>
```

You will wrap it with the MediaLoader and provide a loading strategy:
```jsx
import MediaLoader from '@pedalboard/media-loader';
...

<MediaLoader
    loadingStrategy={(mediaHTMLElementRefs, loadMedia) => {
        // You loading strategy here
    }}
>
    <img src="/assets/image-04.jpg" alt="image-04"></img>
    <img src="/assets/image-05.jpg" alt="image-05"></img>
    <img src="/assets/image-06.jpg" alt="image-06"></img>
    <div>
        <img src="/assets/image-09.jpg" alt="image-09"></img>
    </div>
</MediaLoader>
```

In the following code example we have 3 images, when the image container is clicked on it starts sliding to the right.<br>
Our **loading strategy** here is: "When the left css value of the image is above 300, load the image.
(Watch the result in the link below)

```jsx
import MediaLoader from '@pedalboard/media-loader';
...

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
```

📽️ [Watch the result](./docs/assets/images-animation.mp4) 

Check out the **FAQ** below for more details


## Storybook
You can also see more example with their code in the project's [Storybook](https://65f0a7c612ec612e3b7b2059-pqygczjhcu.chromatic.com/)


## FAQ
<details>
    <summary>Why do I need this at all?</summary>
        <p>
        As your browser begins parsing your HTML document, it initiates the loading process for all media content included on the page by default. However, handling numerous or sizable media files in this manner can strain network resources and delay the loading of essential assets, adversely impacting page performance. It's important to note that in many cases, fetching the entirety of the media content isn't necessary for the page to achieve readiness and interactivity. To mitigate these issues, implementing techniques like lazy loading through tools such as MediaLoader can significantly improve page loading times and user experience. By selectively loading media assets based on user interaction or viewport visibility, MediaLoader helps optimize resource utilization and enhances overall performance.
        </p>
</details>

<details>
    <summary>Do I need to change the wrapped JSX?</summary>
        <p>
        Nope.
        The MediaLoader was made as such that you do not need to change the structure of your JSX. Simply wrap it and you should be good to go.
        </p>
</details>

<details>
    <summary>Does MediaLoader know how to deal with nested DOM?</summary>
        <p>
        Yep :)
        </p>
</details>

<details>
    <summary>Does MediaLoader know how to deal `Source` tags as well as with `src` attributes?</summary>
        <p>
        Yes!
        MediaLoader can control both formats of Video and Audio tags.  
        </p>
</details>

## Contribution
see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
