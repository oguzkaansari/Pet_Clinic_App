function getAllTickets() {

    $.ajax({
        url: '/buy/all/0',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createRow(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}
getAllTickets();

function createRow(data) {

    let html = ``;

    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                    <td>`+itm.title+`</td>
                    <td>`+itm.price+`</td>
                    <td>`+itm.supplier.name+`</td>
                    <td>`+itm.no+`</td>
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showTicketNote(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>      
                 </tr>`;
    }

    $('#tBodyBuyListTickets').html(html);
}

$('#buy_list_search').submit( ( event ) => {
    event.preventDefault();

    let key = $("#b_key").val();

    if(key === null || key === undefined || key === ""){
        key = "0";
    }

    $.ajax({
        url: '/buy/search/' + key,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            saleArr = data;
            createRow(data);

        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})

function showTicketNote(note) {
    let html = ``;
    html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Fatura Notu"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3">
                            `+note+`
                        </div>
                    </div>`;

    $('#ticketNoteModalBuyListContent').html(html);
    $('#ticketNoteModalBuyList').modal('toggle');
}