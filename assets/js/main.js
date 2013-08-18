// this script executes when the document is ready...
$(function() {
    $('div.filter-box').on('click', 'a', function(e) {
        // prevent the default browser action for the click
        e.preventDefault();
        // grab a reference to the clicked <a> 
        var $clicked = $(e.target);
        // find all <a> elements in the containing <ul> and remove the "active" class
        $clicked.closest('ul').find('a').removeClass('active');
        // add the active class to the <a> that was clicked
        $clicked.addClass('active');

        // now get the currently active filters...
        var activeFilters = getActiveFilters();
        // ...and apply them to the filter grid
        applyFilters(activeFilters);
    });

    /**
     * Applies filters to the grid
     *
     * @param {object} filters The object containing active filter names and values
     */
    function applyFilters(filters) {
        // grab a reference to the grid that contains our courses
        var $grid = $('#grid');
        // we created a variable $matched that represents all the courses we want to leave visible,
        // at first this will be all of the courses
        var $matched = $grid.find('div.box');

        // we hide them all initially by adding a class called "hidden"
        // NOTE: we use a class here so we can transition the results using CSS3, but you could
        // just as easily use jQuery's show() and hide() methods if you don't care about CSS3 transitions
        $matched.addClass('hidden');

        // we use a for loop to iterate over the filters
        for (var f in filters) {
            // we check if the filter name is valid, and that it doesn't have a value of "all"
            // if the value is "all" then we do not want to filter courses for this particular filter
            if (filters.hasOwnProperty(f) && filters[f] !== 'all') {
                // here we filter the courses by using jQuery's .filter() method
                // we construct a selector that makes use of the data-* attribute, for example:
                // div.box[data-course-hours="full"] will remove any courses that do not have a value of "full" 
                $matched = $matched.filter('div.box[data-' + f + '="' + filters[f] + '"]');
            }
        }
        // at this point we have filtered out any courses that do not match our active filters
        // we remove our "hidden" class to show the results
        $matched.removeClass('hidden');
    }

    /**
     * Gets an array of active filters from the selected items
     *
     * @returns {object}
     */
    function getActiveFilters() {
        var active = {};
        $.each($('div.filter-box a.active'), function(i, e) {
            var filterName = $(e).closest('ul').data('filter-name');
            active[filterName] = $(e).data('filter');
        });

        return active;
    }
});
