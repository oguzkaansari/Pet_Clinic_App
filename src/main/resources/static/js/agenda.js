function getAllNotes() {

    $.ajax({
        url: '/agenda/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createRow(data);
        },
        error: function (err) {
            console.log(err);
        }
    })

}
getAllNotes();

function createRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.title+`</td>
            <td>`+itm.date.slice(0,10)+`</td>
            <td>`+itm.hour+`</td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="showNoteDetail(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>            
          </tr>`;
    }
    $('#tBodyNotes').html(html);
}

function showNoteDetail(note) {

    let html = ``;
    html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Not Detayý"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3">
                            `+note+`
                        </div>
                    </div>`;

    $('#noteDetailModalContent').html(html);
    $('#noteDetailModal').modal('toggle');
}


$('#note_add_form').submit( ( event ) => {
    event.preventDefault();

    const title = $("#n_title").val();
    const note = $("#n_note").val();
    const hour = $("#n_time").val();
    const date = $("#n_date").val();

    const obj = {
        title: title,
        note: note,
        hour: hour,
        date: date
    }
    console.log(obj);
    $.ajax({
        url: '/agenda/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== "0" ) {
                console.log(data);
                $('#note_add_form').trigger("reset");
                getAllNotes();
            }else {
                alert("Ýþlem sýrasýnda hata oluþtu!");
            }
        },
        error: function (err) {
            console.log(err);
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})

