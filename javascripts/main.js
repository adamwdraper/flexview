$.fn.extend({
  activate: function(classes = 'active') {
    return this.each(function() {
      const $this = $(this);

      $this.siblings().removeClass(classes);

      $this.addClass(classes);
    });
  },
  drags: function(options) {
    return this.each(function(options) {
      const $el = $(this);
      const direction = $el.data('handle');
      const drag = function(e) {
        const zIndex = $el.css('z-index');
        const height = $el.outerHeight();
        const width = $el.outerWidth();
        const y = $el.offset().top + height - e.pageY;
        const x = $el.offset().left + width - e.pageX;
        const resize = function(e) {
          const prev = $el.prev();
          const next = $el.next();
          const total = direction === 'horizontal' ? prev.outerWidth() + next.outerWidth() : prev.outerHeight() + next.outerHeight();
          let prevPercentage;
          let nextPercentage;

          if (direction === 'horizontal') {
            prevPercentage = (((e.pageX - prev.offset().left) + (x - width / 2)) / total);
          } else {
            prevPercentage = (((e.pageY - prev.offset().top) + (y - height / 2)) / total);
          }
          
          nextPercentage = 1 - prevPercentage; 
          
          if (prevPercentage * 100 < options.min || nextPercentage * 100 < options.min) {
            return; 
          }
          
          prev.css('flex', prevPercentage.toString());
          next.css('flex', nextPercentage.toString());
        };
        const drop = function() {
          $('body').css('cursor', priorCursor);
          $el.removeClass('dragging').css('z-index', zIndex);

          $el.parents().off('mousemove');
        };

        $el.addClass('dragging').css('z-index', 1000).parents().on('mousemove', resize);
        
        priorCursor = $('body').css('cursor');

        $('body').css('cursor', options.cursor);

        $(document).on('mouseup', drop);

        e.preventDefault();
      };
      let priorCursor;

      options = $.extend({
        cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
        min: 20
      }, options);

      console.log(direction, direction === 'horizontal', options.cursor);

      return $el.css('cursor', options.cursor).on('mousedown', drag);
    });
  }
});


$(function() {
  const router = {
    routes: {
      1: '1',
      2: '2',
      3: '3',
      4: '4'
    },
    navigate: function(route) {
      const view = this.routes[route] || '1';

      history.pushState({
        view: view
      }, `View ${view}`, `${view}`);

      this.activate(route);
    },
    activate: function(view) {
      $(`[data-view='${view}']`).activate();
    }
  };

  $('[data-handle]').drags();

  $('[data-route]').on('click', function(event) {
    router.navigate($(event.currentTarget).data('route'));
  });

  router.navigate(window.location.pathname.substr(1));
});