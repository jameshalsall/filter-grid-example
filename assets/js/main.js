// this script executes when the document is ready...
$(function() {
    $('div.filter-box').on('click', 'a', function(e) {
        e.preventDefault();
        var $clicked = $(e.target);
        $clicked.closest('ul').find('a').removeClass('active');
        $clicked.addClass('active');

        var activeFilters = getActiveFilters();
        var $grid = $('#grid');
        var $courses = $grid.find('div.box');
        $courses.hide();

        for (var filter in activeFilters) {
            if (activeFilters.hasOwnProperty(filter) && activeFilters[filter] !== 'all') {
                $courses = $courses.filter('div.box[data-' + filter + '="' + activeFilters[filter] + '"]');
            }
        }
        $courses.show();
    });

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
