(function($){
	
	$(function(){

		var validUsername = false;
		var validPassword = false;
		var fetchingData;

		$('input.username').tooltip({
			animation: true,
			placement: 'right',
			selector: '#login',
			title: 'username required',
			trigger: 'manual'
		});

		$('input.password').tooltip({
			animation: true,
			placement: 'right',
			selector: '#login',
			title: 'enter password (min length: 3)',
			trigger: 'manual'
		});

		$('input.password-match').tooltip({
			animation: true,
			placement: 'right',
			selector: '#login',
			title: "password doesn't match",
			trigger: 'manual'
		});

		var validateUserName = function(e){
			var username = $('input.username').val();
			if($.trim(username)===''){
				e.preventDefault();
				validUsername = false;
				$('input.username').tooltip('show');
				$('input.username').focus();

				return;
			}
			isUsernameAvailable(e);
		};

		var isUsernameAvailable = function(e){
			if(fetchingData)
				fetchingData.abort();
			
			fetchingData = $.ajax('/user/available/' + $('input.username').val(), {
				type: 'GET',
				cache: false,
				dataType: 'json',
				async: false,
				beforeSend: function(){
					$("input.username").mask("Checking availability");
					$('.form-register .alert').remove();
				},
				complete: function(){
					fetchingData = null;
					$("input.username").unmask();
				},
				success: function(data, status, xhr){
					if(data.available){
						validUsername = true;
						$('input.username').tooltip('hide');
						$('input.username').css('color','green');
					} else {
						e.preventDefault();
						validUsername = false;
						$('input.username').tooltip('show');
						$('input.username').focus();
						if(data.error){
							showError(data.error);
						}
						else {
							showError($('input.username').val() + ' already taken');
						}
					}
				},
				error: function(xhr, status, error){
					e.preventDefault();
					validUsername = false;
					$('input.username').focus();
					showError(error);
				}
			});
		};

		var showError = function(errorMessage){
			$('.form-register .alert').remove();
			$('.form-register').append('\
				<div class="alert fade in">\
            		<button type="button" class="close" data-dismiss="alert">×</button>\
            		<span>' + errorMessage + '</span>\
               	</div>');
		};

		var validatePassword = function(e){
			var pwd = $('input.password').val();
			if($.trim(pwd)==='' || $.trim(pwd).length < 3){
				e.preventDefault();
				validPassword = false;
				$('input.password').tooltip('show');
				$('input.password').focus();
			} else {
				validPassword = true;
				$('input.password').tooltip('hide');
			}
		};

		var validatePasswordMatch = function(e){
			var pwd1 = $.trim($('input.password').val());
			var pwd2 = $.trim($('input.password-match').val());
			if(pwd1 !== pwd2){
				e.preventDefault();
				validPassword = false;
				$('input.password-match').tooltip('show');
				$('input.password-match').focus();
			} else {
				validPassword = true;
				$('input.password-match').tooltip('hide');
			}
		};

		$('input.username').blur(function(e){
			validateUserName(e);
		});

		$('input.password').blur(function(e){
			validatePassword(e);
		});

		$('input.password-match').blur(function(e){
			validatePasswordMatch(e);
		});

		$('input.register').click(function(e){
			e.preventDefault();
			
			validateUserName(e);
			validatePassword(e);
			validatePasswordMatch(e);
			
			if(validUsername && validPassword){
				$('div.form-register form').submit();
			}
		});
	});

})(jQuery);