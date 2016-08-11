$.fn.extend({
  activate: function(classes = 'active') {
    return this.each(function() {
      const $this = $(this);

      $this.siblings().removeClass(classes);

      $this.addClass(classes);
    });
  },
  minimize: function() {
    return this.each(function() {
      const $this = $(this);
      const $siblings = $this.siblings().not('[data-handle]');

      $this.addClass('minimized').css({
        flex: 'none'
      });

      $siblings.each(function() {
        const $this = $(this);

        if ($this.hasClass('.minimized') || $this.css('flex')) {
          $this.maximize();
        }
      });
    });
  },
  maximize: function() {
    return this.each(function() {
      const $this = $(this);

      $this.removeClass('minimized').css({
        flex: '',
        width: ''
      });
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

      return $el.css('cursor', options.cursor).on('mousedown', drag);
    });
  }
});


$(function() {
  const router = {
    routes: {
      '1': {
        view: '1',
        render: function($el) {
          $el.addClass('has-status');

          setTimeout(function() {
            $el.removeClass('has-status');
          }, 2000);
        }
      },
      '2': {
        view: '2'
      },
      '3': {
        view: '3'
      }
    },
    navigate: function(route) {
      const view = this.routes[route] || this.routes['1'];

      history.pushState({
        view: view.view
      }, `View ${view.view}`, `${view.view}`);

      this.activate(view);
    },
    activate: function(view) {
      const $el = $(`[data-view='${view.view}']`).activate();

      if (view.render) {
        view.render($el);
      }
    }
  };

  $('[data-handle]').drags();

  $('[data-route]').on('click', function(event) {
    router.navigate($(event.currentTarget).data('route'));
  });

  $('[data-minimize]').on('click', function(event) {
    $(event.currentTarget).parent().parent().parent().minimize();
  });

  $('[data-maximize]').on('click', function(event) {
    $(event.currentTarget).parent().parent().parent().maximize();
  });

  router.navigate(window.location.pathname.substr(1));
});