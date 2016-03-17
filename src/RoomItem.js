function RoomItem(params) {
    this.name = '';
    this.title = '';
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.image = '';
    this.html = document.createElement('div');

    this.html.style.position = 'absolute';
    this.html.style.background = 'rgba(255, 255, 255, 0.5)';
    this.html.style.border = '1px solid #666';

    this.setParam = function (name, value) {
        var method = 'set' + name.substring(0, 1).toUpperCase() + name.substring(1);

        if(typeof(this[method]) == 'function') {
            this[method](value);
        }
    };

    this.setName = function (name) {
        this.name = name;
    };

    this.setTitle = function (title) {
        this.title = title;
        this.html.setAttribute('title', title);
    };

    this.setWidth = function (width) {
        this.width = width;
        this.html.style.width = width + 'px';
    };

    this.setHeight = function (height) {
        this.height = height;
        this.html.style.height = height + 'px';
    };

    this.setLeft = function (left) {
        this.left = left;
        this.html.style.left = left + 'px';
    };

    this.setTop = function (top) {
        this.top = top;
        this.html.style.top = top + 'px';
    };

    this.setImage = function (image) {
        this.image = image;
        this.html.style.background = 'url(' + image + ')';
        this.html.style.backgroundSize = '100% 100%';
    };

    this.getHTML = function () {
        return this.html;
    };

    this.getSerialized = function() {
        var serialized = [
            '"name":"' + this.name + '"',
            '"title":"' + this.title + '"',
            '"width":' + this.width + '',
            '"height":' + this.height + '',
            '"left":' + this.left + '',
            '"top":' + this.top + '',
            '"image":"' + this.image + '"'
        ];

        return '{' + serialized.join(',')  + '}';
    };

    for(var i in params) {
        if(params.hasOwnProperty(i)) {
            this.setParam(i, params[i]);
        }
    }
}