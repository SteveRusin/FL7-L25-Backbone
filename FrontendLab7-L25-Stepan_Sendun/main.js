var Candidat = Backbone.Model.extend({
    defaults: {
        name: '',
        surname: '',
        rating: 0
    },
    validate: function (attributes) {
        if (attributes.name === '') {
            return 'enter a name';
        }
    }
});

var CandidatCollection = Backbone.Collection.extend({
    model: Candidat
});

var candidatsCollection = new CandidatCollection([
    {
        name: 'Vit9',
        surname: 'Yanucovich',
        rating: 14
    },
    {
        name: 'Pet9',
        surname: 'Poroh',
        rating: 40
    },
    {
        name: 'Vital9',
        surname: 'Klichko',
        rating: 26
    },
]);


//candidatsCollection.comparator = 'name';

candidatsCollection.comparator = function (model) {
    return model.get('rating');
}


var CandidatView = Backbone.View.extend({
    tagName: 'div',
    className: 'candidat',
    render: function () {
        this.$el.html(`<div>${this.attributes.name} ${this.attributes.surname} ${this.attributes.rating}</div> <button class="btn btn-primary button">delete me</button>`);
        return this;
    }

})


var CandidatsView = Backbone.View.extend({
    tagName: 'div',
    className: 'candidats',
    render: function () {
        var that = this;
        that.$el.html('');
        this.model.models.forEach(function (el, index) {
            that.$el.append(new CandidatView(el).render().$el);
        })

        return this;
    },
    initialize: function (atrr) {
        var that = this;
        atrr.model.on('add', function () {
            that.render();
        })
    },
    events: {
        'click': function (el) {
            var that = this;
            if (el.target.tagName === "BUTTON") {
                candidatsCollection.models.splice($(el.target).parent().index(), 1);
                console.log(candidatsCollection.models)
                that.render();
            }
        }
    }
});

var FormView = Backbone.View.extend({
    initialize: function (el) {
        var that = this;
        let newCandidat;

        $(el.children()[3]).on('click', function () {
            newCandidat = {
                name: el.children()[0].value,
                surname: el.children()[1].value,
                rating: el.children()[2].value
            }
            candidatsCollection.push(new Candidat(newCandidat));
        })
    }
});


new FormView($('#form'));
$('#container').html(new CandidatsView({
    model: candidatsCollection
}).render().$el);
