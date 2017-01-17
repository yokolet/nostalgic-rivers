$(function(){

    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data);
        },
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },
        getCat: function(id) {
            return JSON.parse(localStorage.cats)[id];
        },
        updateCat: function(id, obj) {
            var data = JSON.parse(localStorage.cats);
            data[id]=obj;
            localStorage.cats = JSON.stringify(data);
        }
    };

    var octopus = {
        addNewCat: function(id, catName, catImage) {
            model.add({
                id: id,
                name: catName,
                image: catImage,
                clickCount: 0
            });
        },
        createAllCats: function() {
            cat_data = [
                {
                    "name": "Missy",
                    "img": "img/cat_picture2.jpeg"
                },
                {
                    "name": "Purr",
                    "img": "img/cat_picture3.jpeg"
                },
                {
                    "name": "Meow",
                    "img": "img/cat_picture4.jpeg"
                },
                {
                    "name": "Kitty",
                    "img": "img/cat_picture5.jpeg"
                }
            ];
            for (var i=0; i<cat_data.length; i++) {
                octopus.addNewCat(i, cat_data[i]["name"], cat_data[i]["img"]);
            }
            console.log(octopus.getCats());
            view.renderCats();
        },
        getCats: function() {
            return model.getAllCats();
        },
        getCat: function(id) {
            cat = model.getCat(parseInt(id));
            view.renderCat(cat);
        },
        countUp: function(cat) {
            cat.clickCount += 1;
            model.updateCat(cat.id, cat);
            view.renderCat(cat);
        },
        init: function() {
            localStorage.clear()
            model.init();
            octopus.createAllCats();
            view.init();
        }
    };

    var view = {
        init: function() {
            this.catList = $('#cat-list');
            this.catContainer = $('#cat-container');
        },
        renderCats: function(){
            var htmlStr = '';
            octopus.getCats().forEach(function(cat){
                htmlStr +=
                    '<div>\n' + 
                    '  <button id="' + cat.name + '" class="button primary expanded">\n'+
                        cat.name + '\n' +
                    '  </button>\n' +
                    '</div>';
            });
            $('#cat-list').html( htmlStr );
            octopus.getCats().forEach(function(cat){
                $('#' + cat.name).click(function() {
                    octopus.getCat(cat.id);
                });
            });
        },
        renderCat: function(cat){
            var htmlStr = '';
            htmlStr +=
                '<div class="cat-selected">\n' +
                '  <img id="selected_' + cat.id + '"' +
                '       src="' + cat.image + '"/>\n' +
                '  <div>Name: ' + cat.name + '</div>\n' +
                '  <div>Count: ' + cat.clickCount + '</div>\n'+
                '</div>\n';
            this.catContainer.html( htmlStr );
            $('#selected_' + cat.id).click(function() {
                octopus.countUp(cat);
            });
        }
    };

    octopus.init();
});
