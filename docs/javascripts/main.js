$.fn.extend({
  activate: function(classes = 'active') {
    return this.each(function() {
      const $this = $(this);

      $this.siblings().removeClass(classes);

      $this.addClass(classes);
    });
  }
});


$(function() {
  const $body = $('body');
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

      history.replaceState({
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

  // navigation
  $('[data-route]').on('click', function(event) {
    router.navigate($(event.currentTarget).data('route'));
  });

  // load initial route
  router.navigate(window.location.pathname.substr(1));

  // toggle overlays class on body
  $('#toggle-overlays').on('change', function() {
    const className = 'show-overlays';

    if ($(this).is(':checked')) {
      $body.addClass(className);
    } else {
      $body.removeClass(className);
    }
  });
});
