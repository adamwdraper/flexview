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

  $('[data-route]').on('click', function(event) {
    router.navigate($(event.currentTarget).data('route'));
  });

  router.navigate(window.location.pathname.substr(1));
});
