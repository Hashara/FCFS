
function addRow() {
  var lastRow = $('#inputTable tr:last');
  var count = parseInt(lastRow.children()[0].innerText);

  var newRow = '<tr><td>'+(count + 1)+'</td><td>'
  + 'P'+(count + 1)
  + '</td><td>'
  + '<input class="arictime" type="text"/>'
  + '</td><td><input class="exectime" type="text"/></td>'
 
  lastRow.after(newRow);

  var minus = $('#minus');
  minus.show();
  minus.css('top', (parseFloat(minus.css('top')) + 24) + 'px');

}

function deleteRow() {
  var lastRow = $('#inputTable tr:last');
  lastRow.remove();

  var minus = $('#minus');
  minus.css('top', (parseFloat(minus.css('top')) - 24) + 'px');

  if (parseFloat(minus.css('top')) < 150)
    minus.hide();
}


function WaitTime(a){
  
  var t=0;
  var i=0;
  var waitarr=[];
 for (i = 0; i < a.length; i++) {
    
    if(t>a[i][0]){
      
      waitarr.push(t-a[i][0]);
    }else{
      
      waitarr.push(0);
      t=a[i][0];
    }
    
    t+= a[i][1];
    
    }return waitarr;
    // console.log(a);
    // for (i = 0; i < a.length; i++) {
     
    // if(t>a[i][0]){
    //  console.log(t-a[i][0]);

    // }else{
    //  console.log(0);
    //  t=a[i][0];
    // }
    // //console.log(WaitTime);
    // t+= a[i][1];
    // console.log("t"+t);
    // // console.log("w "+WaitTime);
    // }
  
}




function TurnaroundTime(a){
  

  var t=0;
  var i=0;
  var tatarr=[];
  
    for (i = 0; i < a.length; i++) {
  
      if(t>a[i][0]){
        tatarr.push(t-a[i][0]+a[i][1]);
      }else{
        tatarr.push(a[i][1]);
        t=a[i][0];
      }
      t+= a[i][1];
      
      }return tatarr;
}



function avg(a){      

var sumVal=0;
for(var i = 1; i <a.length; i++)
{
    sumVal = sumVal +a[i];
}

return sumVal/a.length;

}
  
  

function draw() {
  
  $('fresh').html('');
  var inputTable = $('#inputTable tr');
  var th = '';
  var td = '';
  
  var a=[];
    $.each(inputTable, function (key, value) {
      
      if (key == 0) return true;
      var executeTime = [parseInt($(value.children[2]).children().first().val()),parseInt($(value.children[3]).children().first().val()),key];
      a.push(executeTime);
      
      
    });console.log(a);

    a.sort(sortFunction);
    t=0;
    var wa=WaitTime(a);
    document.getElementById("avgWt").innerHTML = "AvgWait Time = " +avg(wa);
    // console.log(wa);
    var tat=TurnaroundTime(a);
    document.getElementById("avgTat").innerHTML = "Tat Time = " +avg(tat);
    for (i = 0; i < a.length; i++) {
      
     

      if(a[i][0]<=t){
        th += '<th style="height: 60px; width: ' + a[i][1] * 20 + 'px;">P' + (a[i][2] -1)+ '</th>';
      td += '<td><p>' + a[i][1] + '</p><br>'+'<div class="card2"><p> wait time= ' + wa[i] + '</p>'+'<p> Tat time= ' + tat[i] + '</p><div>'+'</td>';
      
      
      
      
      }else{
        th += '<th style="height: 60px; width: ' + (a[i][0]-t) * 20 + 'px;">' + "idle"+ '</th>';
        td += '<td>' + (a[i][0]-t)  + '</td>';
        
      th += '<th style="height: 60px; width: ' + a[i][1] * 20 + 'px;">P' + (a[i][2] -1)+ '</th>';
      td += '<td><p>' + a[i][1] + '</p><br>'+'<div class="card2"><p> wait time= ' + wa[i] + '</p>'+'<p> Tat time= ' + tat[i] + '</p><div>'+'</td>';
      
      


      }t=a[i][0]+a[i][1];
      
    }
    $('fresh').html('<table id="resultTable"><tr>'
                    + th
                    + '</tr><tr>'
                    + td
                    + '</tr></table>'
                   );
  
  animate();

}

function animate() {
	$('fresh').prepend('<div id="curtain" style="position: absolute; right: 0; width:100%; height:260px;"></div>');
  
  $('#curtain').width($('#resultTable').width());
  $('#curtain').css({left: $('#resultTable').position().left});
  
  var sum = 0;
  $('.exectime').each(function() {
      sum += Number($(this).val());
  });
  
  
  var distance = $("#curtain").css("width");
  
  animationStep(sum, 0);
  jQuery('#curtain').animate({ width: '0', marginLeft: distance}, sum*1000/2, 'linear');
}

function animationStep(steps, cur) {
	$('#timer').html(cur);
	if(cur < steps) {
		setTimeout(function(){ 
   	     animationStep(steps, cur + 1);
  	}, 500);
  }
  else {
  }
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}