function Room(params) {
    this.items = {};
    this.title = '';
    this.width = 0;
    this.height = 0;
    this.background = '';
    this.html = document.createElement('div');
    this.drug = {status: false, item: null, posX: 0, posY: 0, itemX: 0, itemY: 0};

    this.html.style.position = 'relative';

    this.setParam = function (name, value) {
        var method = 'set' + name.substring(0, 1).toUpperCase() + name.substring(1);

        if (typeof(this[method]) == 'function') {
            this[method](value);
        }
    };

    this.setItemParam = function (item, name, value) {
        if (typeof(this.items[item]) != 'undefined') {
            this.items[item].setParam(name, value);
        }
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

    this.setBackground = function (background) {
        this.background = background;
        this.html.style.background = 'url(' + background + ')';
    };

    this.addRoomItem = function (item) {
        this.items[item.name] = item;

        this.html.appendChild(item.getHTML());
    };

    this.getHTML = function () {
        return this.html;
    };

    this.getSerialized = function () {
        var items = [],
            room = [
                '"title":"' + this.title + '"',
                '"width":' + this.width + '',
                '"height":' + this.height + '',
                '"background":"' + this.background + '"'
            ];

        for (var i in this.items) {
            items.push('"' + i + '":' + this.items[i].getSerialized());
        }

        var serialized = ['"room":{' + room.join(',') + '}', '"items":{' + items.join(',') + '}'];

        return '{' + serialized.join(',') + '}';
    };

    this.startDrug = function (e) {
        var event = e || window.event,
            item = null;

        item = this.items['bed'];

        console.log(event.clientX, event.clientY);

        this.drug = {
            status: true,
            item: item,
            posX: event.clientX,
            posY: event.clientY,
            itemX: item.left,
            itemY: item.top
        };

        self.drug.status = true;
    };

    this.stopDrug = function (e) {
        var event = e || window.event;

        this.drug = {status: false, item: null, posX: 0, posY: 0, itemX: 0, itemY: 0};
    };

    this.processDrug = function (e) {
        var event = e || window.event;

        if(this.drug.status) {
            this.drug.item.setLeft(this.drug.itemX + (event.clientX - this.drug.posX));
            this.drug.item.setTop(this.drug.itemY + (event.clientY - this.drug.posY));
        }
    };

    var self = this;

    if (typeof(this.html.addEventListener) != 'undefined') {
        this.html.addEventListener('mousedown', function (e) {
            self.startDrug(e);
        });
        document.addEventListener('mouseup', function (e) {
            self.stopDrug(e);
        });
        document.addEventListener('mousemove', function (e) {
            self.processDrug(e);
        });
    } else {
        this.html.attachEvent('onmousedown', function (e) {
            self.startDrug(e);
        });
        window.attachEvent('onmouseup', function (e) {
            self.stopDrug(e);
        });
        window.attachEvent('onmousemove', function (e) {
            self.processDrug(e);
        });
    }

    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            this.setParam(i, params[i]);
        }
    }
}