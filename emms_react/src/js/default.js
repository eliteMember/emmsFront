



$(function(){

	// 탭
	$('ul[class=tbTab01]').each(function(){
		var _this = $(this);
		//_this.parent().find($('.tabCont').not(':first')).hide();
		_this.siblings().find('.tabCont').hide();
		$(this).find('>li a').click(function(e){
			$('.tabCont').hide();
			$($(this).attr('href')).show();
			_this.find('>li').removeClass('current')
			$(this).parent().addClass('current')
			e.preventDefault();
		});
	});

	// 탭안에 탭
	$('.tbTab02').each(function(){
		var _this = $(this);
		//_this.parent().find($('.tabCont2').not(':first')).hide();
		//_this.siblings().find('.tabCont2').hide();
		$(this).find('>li a').click(function(e){
			$('.tabCont2').hide();
			$($(this).attr('href')).show();
			_this.find('>li').removeClass('current')
			$(this).parent().addClass('current')
			e.preventDefault();
		});
	});

	//파일등록-인풋박스+버튼
	$('.filebox button.btnX').hide();
	var fileTarget = $('.filebox input[type=file]'); 
	fileTarget.on('change', function(){ 
		var cur=$(this).val();
		$(this).next().val(cur);
		$(this).siblings('.btnX').show();

		$('.filebox button.btnX').click(function(){
			$(this).siblings('input').val('');
			$(this).hide();
		});	
	});
	//파일등록 input비활성화
	$('.filebox input.uploadName').attr('disabled','disabled'); //20210421 추가

	//레이어팝업-닫기
	$(".popClose").click(function(){
		$(this).parent().hide();
		$(this).parent().prev('.dimmed').hide();
    });


	/* 레이어달력 -월일표시*/
	if($('.datepickerBox').length>0){
		$('.datepickerBox input').datepicker({
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월' ],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			showOn : 'button',
			buttonImage : '../imgs/ic_calendar.png',
			buttonText : '날짜선택',
			dateFormat : 'yy-mm-dd',
			changeYear: true,
			changeMonth: true,
			showButtonPanel : true,
			closeText : '닫기',
			currentText : '오늘',
			showOtherMonths : true,
			selectOtherMonths : true,
			showMonthAfterYear : true
		});
	};

	
	/*레이어달력 월표시*/
	$(".monthpickerBox input").monthpicker({
		monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)','7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		showOn: "button",
		buttonImage : '../imgs/ic_calendar.png',
		showButtonPanel : true,
		closeText : '닫기',
		changeMonth: true,
		yearRange: 'c-2:c+2',
		dateFormat: 'yy-mm',
		yearSuffix:'년'
	});

	/* 20210506 수정 */
	var gnbCur = -1;
	$('.gnbWrap > ul > li').each(function(){ if($(this).hasClass('on')) gnbCur = $(this).index();});
	$(document).on('mouseenter' , '.gnbWrap > ul > li > a' , function(){
		var parentElement = $(this).parent();
		parentElement.removeClass('leave').addClass('hover').siblings().removeClass('hover').addClass('leave');
	});
	$(document).on('mouseleave' , '.gnbWrap > ul' , function(){
		if(gnbCur >= 0){
			//console.log(gnbCur);
			var element = $(this).find('> li').eq(gnbCur);
			element.removeClass('hover leave').addClass('on').siblings().removeClass('leave hover');
		}		
	});
	/* //20210506 수정 */

	/* 20210806 수정 */
	$(document).on('click mouseleave' , '.gnbUtil > li' , function(e){
		if($(this).hasClass('userMypage') || $(this).hasClass('userInfo')){
			if(e.type == 'click'){
				if($(this).hasClass('hover')){
					$(this).removeClass('hover');
				}else{
					$(this).addClass('hover');
				}
			}else{
				$(this).removeClass('hover');
			}
		}

	});
	/* //20210806 수정 */

	/* 20210601 멀티셀렉트 | UI_CCHP_2030  UI_CCHP_2040  */
	$(".multeSelectLayer").hide();
	$(".multipleSelect .select").click(function(){
		$(this).siblings().toggle();
	});


  });



