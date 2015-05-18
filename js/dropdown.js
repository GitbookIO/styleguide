(function ($) {
    function toggle(e) {
        e.stopPropagation();

        var $this = $(this);
        var $dropdown = $this.parent();

        var isOpen = $dropdown.hasClass('open');
        $dropdown.toggleClass('open', !isOpen);

        var close = function() {
            $dropdown.removeClass('open');
        }

        if (!isOpen) {
            $(window).bind('click', close);
        } else {
            $(window).unbind('click', close);
        }
    }

    $(document)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api', '[data-toggle="dropdown"]',toggle);

})(jQuery);

