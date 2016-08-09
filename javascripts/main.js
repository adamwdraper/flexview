$.fn.extend({
  activate: function(classes = 'active') {
    return this.each(function() {
      const $this = $(this);

      $this.siblings().removeClass(classes);

      $this.addClass(classes);
    });
  }
});



$.fn.drags = function(options) {
  const direction = this.data('handle');
  const dragHandle = function(e) {
    const $el = $(this);
    const zIndex = $el.css('z-index');
    const height = $el.outerHeight();
    const width = $el.outerWidth();
    const y = $el.offset().top + height - e.pageY;
    const x = $el.offset().left + width - e.pageX;

    $el.addClass('dragging');
    
    priorCursor = $('body').css('cursor');

    $('body').css('cursor', options.cursor);

    $el.css('z-index', 1000).parents().on('mousemove', function(e) {
      const prev = $el.prev();
      const next = $el.next(); 
      const total = prev.outerWidth() + next.outerWidth();
      
      // Assume 50/50 split between prev and next then adjust to
      // the next X for prev
                    
      console.log('l: ' +  prev.outerWidth() + ', r:' + next.outerWidth());
      
      var leftPercentage = (((e.pageX - prev.offset().left) + (x - width / 2)) / total); 
      var rightPercentage = 1 - leftPercentage; 
      
      if(leftPercentage * 100 < options.min || rightPercentage * 100 < options.min) {
        return; 
      }
      
      console.log('l: ' + leftPercentage + ', r:' + rightPercentage);
      
      prev.css('flex', leftPercentage.toString());
      next.css('flex', rightPercentage.toString());
    });

    $(document).on('mouseup', function() {
      console.log('dropped');

      $('body').css('cursor', priorCursor);
      $el.removeClass('dragging').css('z-index', zIndex);

      $el.parents().off('mousemove');
    });

    e.preventDefault();
  };
  let priorCursor;

  options = $.extend({
    cursor: direction === 'horizontal' ? 'ew-resize' : 'ns-resize',
    min: 10
  }, options);

  return this.css('cursor', options.cursor).on('mousedown', dragHandle);
};



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
      $(`[data-view='${view}']`).activate();
    }
  };

  $('[data-handle]').drags();

  $('[data-route]').on('click', function(event) {
    router.navigate($(event.currentTarget).data('route'));
  });

  router.navigate(window.location.pathname.substr(1));
});