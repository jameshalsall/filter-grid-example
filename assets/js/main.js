// this script executes when the document is ready...
$(function() {
    $('div.filter-box').on('click', 'a', function(e) {
        e.preventDefault();
        var $clicked = $(e.target);
        $clicked.closest('ul').find('a').removeClass('active');
        $clicked.addClass('active');

        var activeFilters = getActiveFilters();
        applyFilters(activeFilters);
    });

    /**
     * Applies filters to the grid
     *
     * @param {object} filters The object containing active filter names and values
     */
    function applyFilters(filters) {
        var $grid = $('#grid');
        var $matched = $grid.find('div.box');
        $matched.hide();

        for (var f in filters) {
            if (filters.hasOwnProperty(f) && filters[f] !== 'all') {
                $matched = $matched.filter('div.box[data-' + f + '="' + filters[f] + '"]');
            }
        }
        $matched.show();
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
