$.fn.extend({
  activate: function(classes = 'active') {
    return this.each(function() {
      const $this = $(this);

      $this.siblings().removeClass(classes);

      $this.addClass(classes);
    });
  },
});

$(function() {
  const router = {
    routes: {
      1: '1',
      2: '2',
      3: '3'
    },
    navigate: function(route) {
      const view = this.routes[route] || '1';

      history.pushState({
        view: view
      }, `View ${view}`, `${view}`);

      this.activate(route);
    },
    activate: function(view) {
      $(`[data-view="${view}"]`).activate();
    }
  };

  window.onpopstate = function(event) {
    router.activate(event.state.view);
  };

  $('[data-route]').on('click', function(event) {
    router.navigate($(event.currentTarget).data('route'));
  });

  router.navigate(window.location.pathname.substr(1));
});