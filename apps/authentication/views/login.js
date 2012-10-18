(function ($) {

	$(function(){
		$('input.chk-remember').change(function(e){
			$('input.remember').val($(this).attr('checked') === 'checked');
			console.log($('input.remember').val());
		});
	});

})(jQuery);