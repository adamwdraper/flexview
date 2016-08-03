$(function() {
  const router = {
    navigate: function(event) {
      const route = $(event.currentTarget).data('route');

      history.pushState({}, `View ${route}`, `${route}`);
    }
  };

  $('[data-route]').on('click', router.navigate);
});