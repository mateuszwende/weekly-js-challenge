import { createElement, createInput, removeAllChilds } from "../lib/dom";
import { isEmptyArr } from "../lib/utils";
import { debounce } from "../lib/debounce";

const keyAPI = 'bJyDd9V3ZqqBYFFv8h1XK2iQ5MdlKWhN';
const limit = 25;

export class GiphySearcher {
    constructor(parent) {
        this.parent = parent || document.body;
        this.input = null;
        this.gifsContainer = null;

        this.init();
    }

    init() {
        this.parent.appendChild(this.createElements());
        this.input.addEventListener('keyup', 
            debounce(this.searchGifs.bind(this), 1000));
    }

    createElements() {
        const container = createElement('div', 'container');
        this.gifsContainer = createElement('div', 'gifs-container');
        this.input = createInput(
            { type: 'search', name: 'giphy-search', placeholder: 'Search a gif...'}
        );

        container.appendChild(this.createTitle());
        container.appendChild(this.input);
        container.appendChild(this.gifsContainer);

        return container;
    }

    searchGifs(e) {
        const modifiedPhrase = this.handlePhraseQuery(e.target.value);
        const url = `http://api.giphy.com/v1/gifs/search?q=${modifiedPhrase}&api_key=${keyAPI}&limit=${limit}`;

        this.fetchData(url); 
    }

    fetchData(url) {
        fetch(url)
            .then(this.validateResponse.bind(this))
            .then(this.readResponseAsJSON)
            .then(this.displayGifs.bind(this))
            .catch(this.handleFetchError.bind(this));
    }

    validateResponse(res) {
        if (!res.ok) {
            this.showServerErrMsg();
            throw Error(res.statusText);
        }
        return res;
    }

    readResponseAsJSON(res) {
        return res.json();
    }

    displayGifs(json) {
        if (isEmptyArr(json['data'])) {
            this.showNotFoundMsg();
        }
        else {
            removeAllChilds(this.gifsContainer);

            json['data'].forEach(item => {
                const url = item['images']['original_mp4']['mp4'];
                const width = item['images']['original_mp4']['width'];
                const height = item['images']['original_mp4']['height'];

                this.gifsContainer.appendChild(
                    this.createVideoElem(url, width, height));   
            });    
        }    
    }

    handleFetchError(err) {
        console.error(err);
        this.showSearchErrorMsg();
    }

    showSearchErrorMsg() {
        const errorMsg = createElement('div', 'search-error');
        errorMsg.textContent = "Oops, something went wrong, please try again.";

        removeAllChilds(this.gifsContainer);
        this.gifsContainer.appendChild(errorMsg);
    }

    showNotFoundMsg() {
        const notFoundMsg = createElement('div', 'search-404');
        notFoundMsg.textContent = "No GIFs found. Please, try another phrase.";

        removeAllChilds(this.gifsContainer);
        this.gifsContainer.appendChild(notFoundMsg);
    }

    showServerErrMsg() {
        const serverErrMsg = createElement('div', 'server-error');
        serverErrMsg.textContent = "It seems like the server doesn't respond. This might be due to server maintanance. Please try again in a moment.";

        removeAllChilds(this.gifsContainer);
        this.gifsContainer.appendChild(serverErrMsg);
    }

    handlePhraseQuery(phrase) {
        let filteredStr = phrase.split(" ").filter(str => str !== "" ? true : false);

        for (let i = 0; i < filteredStr.length - 1; i++) {
            filteredStr[i] += '+';
        }

        return filteredStr.join("");
    }

    createVideoElem(url, width, height) {
        const container = createElement('div', 'video-container');
        const video = document.createElement('video');
        video.setAttribute('controls', '');
        video.width = width;
        video.height = height;

        const source = document.createElement('source');
        source.src = url;
        source.type = 'video/mp4';

        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Sorry, your browser doesn't support mp4 videos.";

        video.appendChild(source);
        video.appendChild(errorMsg);
        container.appendChild(video);

        return container;
    }

    createTitle() {
        const title = createElement('p', 'title');
        title.textContent = 'GiphySearcher';

        return title;
    }
}