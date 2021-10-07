function getAllMeetings(idx) {

    $.ajax({
        url: '/meetings/' + idx,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            if(idx === 0){
                createPastRow(data);
            }else{
                createFutureRow(data);
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function createPastRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.doctor.name+`</td>
            <td>`+itm.customer.name+ " " +itm.customer.surname+`</td>
            <td>`+itm.pet.name+`</td>
            <td>`+itm.date.slice(0,10)+`</td>
            
          </tr>`;
    }
    $('#tBodyPastMeetings').html(html);
}

function createFutureRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.doctor.name+`</td>
            <td>`+itm.customer.name+ " " +itm.customer.surname+`</td>
            <td>`+itm.pet.name+`</td>
            <td>`+itm.date.slice(0,10)+`</td>
            
          </tr>`;
    }
    $('#tBodyFutureMeetings').html(html);
}

getAllMeetings(0); // eski
getAllMeetings(1); // yeni