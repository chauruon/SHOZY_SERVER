(function( $ ) {
    $.fn.validateFile = function (validTypes, _callback) {
		var isComplete = true;
		this.each(function() {
			let file = $(this).val();
			if( file ) {
				let tempArr = file.split('.');
				let fileExtension = "";
				if(tempArr.length == 2) {
					fileExtension = tempArr[1].toLowerCase();
				}
	
				if ($.inArray(fileExtension, validTypes) < 0) {
					$.fn.tmsShowWarning("Định dạng không hợp lệ, vui lòng gửi file: " + validTypes.toString());
					isComplete = false;
				}
			}
		});

		_callback(isComplete);
	};

	function formatNumber(n) {
	    // format number 1000000 to 1,234,567
	    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	$.fn.tmsInputCurrency = function(blur = "") {
    	var elVal = $(this).val();
    	if (elVal === "") { return; }
    	var original_len = elVal.length;
    	var caret_pos = $(this).prop("selectionStart");
    	if (elVal.indexOf(".") >= 0) {
    		var decimal_pos = elVal.indexOf(".");
    		var left_side = elVal.substring(0, decimal_pos);
    		var right_side = elVal.substring(decimal_pos);
    		left_side = formatNumber(left_side);
    		right_side = formatNumber(right_side);
    		if (blur === "blur") {
    			right_side += "00";
    		}
    		right_side = right_side.substring(0, 2);
    		elVal = left_side + "." + right_side;
    	} else {
    		elVal = formatNumber(elVal);
    		if (blur === "blur") {
    			elVal += "";
    		}
    	}
    	$(this).val(elVal);
    	var updated_len = elVal.length;
    	caret_pos = updated_len - original_len + caret_pos;
    	$(this)[0].setSelectionRange(caret_pos, caret_pos);
    };

	function setInputFilter(textbox, inputFilter) {
		["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
			textbox[0].addEventListener(event, function() {
				if (inputFilter(this.value)) {
					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;
				} else if (this.hasOwnProperty("oldValue")) {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				} else {
					this.value = "";
				}
			});
		});
	};

	$.fn.tmsInputNumber = function() {
    	setInputFilter($(this), function(value) {
    		return /^\d*$/.test(value);
    	});
    };

	$.fn.tmsValidation = function(type, mess, elMath, callback, dtCallBack) {
    	var element = $(this);
    	var elVal = $(this).val();

    	toastr.options = {
    		"closeButton": true,
    		"debug": false,
    		"newestOnTop": false,
    		"progressBar": true,
    		"positionClass": "toast-top-right",
    		"preventDuplicates": false,
    		"onclick": null,
    		"showDuration": "300",
    		"hideDuration": "1000",
    		"timeOut": "10000",
    		"extendedTimeOut": "10000",
    		"showEasing": "swing",
    		"hideEasing": "linear",
    		"showMethod": "slideDown",
    		"hideMethod": "fadeOut",
    	};
    	switch(type) {
    		case "required":
	    		if ( element.length >= 1 ) {
	    			for (var iEl = 0; iEl < element.length; iEl++) {
	    				if (!$(element[iEl]).val()) {
	    					callback.call(this, false, dtCallBack, mess);
	    				} else if( $(element[iEl]).val().constructor === Array) {
							if ( $(element[iEl]).val().length < 1 ) {
	    						callback.call(this, false, dtCallBack, mess);
	    					} else {
	    						callback.call(this, true, dtCallBack);
	    					}
	    				} else {
	    					callback.call(this, true, dtCallBack);
	    				}
	    			}
	    		} else {
	    			if(!element.val()) {
	    				callback.call(this, false, dtCallBack, mess);
	    			} else {
	    				callback.call(this, true, dtCallBack);
	    			}
	    		}
				break;
    		case "username":
	    		var regexVNI = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
	    		if(regexVNI.test(elVal) == false || elVal == '') {
	    			callback.call(this, false, dtCallBack, mess);
	    		} else {
	    			callback.call(this, true, dtCallBack);
	    		}
				break;
    		case "password":
	    		if(element.length && $(elMath).length ) {
	    			if(elVal != $(elMath).val()) {
	    				callback.call(this, false, dtCallBack, mess);
	    			} else {
	    				callback.call(this, true, dtCallBack);
	    			}
	    		}
				break;
    		case "email":
	    		var email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
	    		if ( element.length >= 1 ) {
	    			for (var iEl = 0; iEl < element.length; iEl++) {
	    				if( email_regex.test($(element[iEl]).val()) == false ) {
	    					callback.call(this, false, dtCallBack, mess);
	    				} else {
	    					callback.call(this, true, dtCallBack);
	    				} 
	    			}
	    		} else {
	    			if( email_regex.test(elVal) == false ) {
	    				callback.call(this, false, dtCallBack, mess);
	    			} else {
	    				callback.call(this, true, dtCallBack);
	    			}
	    		}

				break;
    		
    		default:
    			callback.call(this, false, dtCallBack);
    	}
    };
	$.fn.tmsShowWarning = function (mess) {
		toastr.warning(mess);
    }
	var methods = {
    	init : function(options, _callback) {
			
			let countItemValidate = 0;
			let counterValidate = 0;
			let isShowError = true;
			for(var key in options) {
			    let value = options[key];
			    let valLength = 0;
		    	for (var idxVal = 0; idxVal < value.length; idxVal++) {
		    		valLength += value[idxVal][0].length;
		    	}
			    countItemValidate += valLength;
			}

			dtCallback = [countItemValidate, counterValidate, _callback, isShowError];

    		if ( typeof options.required === 'object' || options.required  ) {
    			for (var i = 0; i < options.required.length; i++) {
    				$(options.required[i][0]).tmsValidation("required", options.required[i][1], "", methods.done, dtCallback);
    			}
    		}
    		if ( typeof options.username === 'object' || options.username  ) {
    			for (var i = 0; i < options.username.length; i++) {
    				$(options.username[i][0]).tmsValidation("username", options.required[i][1], "", methods.done, dtCallback);
    			}
    		}
    		if ( typeof options.password === 'object' || options.password  ) {
    			for (var i = 0; i < options.password.length; i++) {
    				$(options.password[i][0]).tmsValidation("password", options.required[i][1], options.password[i][2], methods.done, dtCallback);
    			}
    		}
    		if ( typeof options.email === 'object' || options.email  ) {
    			for (var i = 0; i < options.email.length; i++) {
    				$(options.email[i][0]).tmsValidation("email", options.email[i][1], "", methods.done, dtCallback);
    			}
    		}
    		if ( typeof options.phone === 'object' || options.phone  ) {
    			for (var i = 0; i < options.phone.length; i++) {
    				$(options.phone[i][0]).tmsValidation("phone", options.phone[i][1], "", methods.done, dtCallback);
    			}
    		}
    		if ( typeof options.birthday === 'object' || options.birthday  ) {
    			for (var i = 0; i < options.birthday.length; i++) {
    				$(options.birthday[i][0]).tmsValidation("birthday", options.birthday[i][1], "", methods.done, dtCallback);
    			}
    		}
    	},
    	done : function (result, dtCallBack, mess = "") {
    		if ( !result ) {
    			if ( dtCallBack[3] )
    				$.fn.tmsShowWarning(mess);
    			dtCallBack[3] = false;
    			dtCallBack[2].call(this, result);
    		} else {
    			if ( dtCallBack[1] == dtCallBack[0] - 1) {
    				dtCallBack[2].call(this, result);
    			}
    			dtCallBack[1]++;
    		}
    	}
    };
	$.fn.tmsFormValidation = function(methodOrOptions, callback) {

    	if ( methods[methodOrOptions] ) {
    		methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            methods.init.apply( this, arguments, callback);
        } else {
        	$.error( 'Method ' +  methodOrOptions + ' does not exist on tmsFormValidation' );
        }    
    };

})( jQuery );


function formatFloatNumber (){
	$(".number-format").on({
		keydown: function(event) {
			if((event.which >= 96 && event.which <= 105) || (event.which >= 48 && event.which <= 57) || event.which == 110 ||  event.which == 8 ||  event.which == 9) {
			} else {
				event.preventDefault();
				return false;               
			}
		},
		keyup: function(event) {
			$(this).tmsInputCurrency();
		},
		blur: function(event) {
			if((event.which >= 96 && event.which <= 105) || (event.which >= 48 && event.which <= 57) || event.which == 110 ||  event.which == 8 ||  event.which == 9) {
				$(this).tmsInputCurrency();
			} else {
				event.preventDefault();
				return false;
			}
		}
	});
};