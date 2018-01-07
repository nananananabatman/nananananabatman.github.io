export function Section() {
    this.item = document.querySelector('section');

    if (!this.item) {
        this.item = document.createElement('section');
        this.item.className = 'news-list';
        document.body.insertBefore(this.item, document.querySelector('footer'));
    }

    this.generateSection = function generateSection(newsData) {
        let elem_result = '';

        if (newsData.length) {
            newsData.forEach(item => elem_result += this.generateArticle(item));
        } else {
            elem_result = this.generateArticle(newsData);
        }

        return elem_result;
    };
}

Section.prototype.generateArticle = function generateArticle(item) {
    return (
`<article class="news-item">
    <a class="news-item__link" href="${item.url}">
        <div class="news-item__image-wrapper">
            <img class="news-item__photo" src="${item.urlToImage}" alt="">
        </div>
        <h2 class="news-item__title">${item.title}</h2>
        <p class="news-item__description">${item.description}</p>
    </a>
</article>`
    );
};

Section.prototype.updateData = function updateData(newsData) {
    this.item.innerHTML = this.generateSection(newsData);
}
