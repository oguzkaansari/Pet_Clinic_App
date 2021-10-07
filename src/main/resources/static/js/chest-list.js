let typeIdx = 0;
let payTypeIdx = 0;

function getAllReceipts(id) {

    $.ajax({
        url: '/chest/receipts/' + id,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createReceiptTable(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function getAllTickets(id) {

    $.ajax({
        url: '/chest/tickets/' + id,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createTicketTable(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function getPayTypes() {
    $.ajax({
        url: '/chest/payTypes/' + id,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createTicketTable(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createReceiptTable(data) {

    let html = `<table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Recete No.</th>
                            <th scope="col">Musteri</th>
                            <th scope="col">Tutar</th>
                            <th scope="col">Odeme Tipi</th>
                            <th scope="col">Durum</th>
                            <th scope="col">Detay</th>
                            <th scope="col">Not</th>
                        </tr>
                        </thead>
                        <tbody>`;

    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                    <td>`+itm.no+`</td>
                    <td>`+itm.customer.name+ " " +itm.customer.surname`</td>
                    <td>`+itm.price+`</td>
                    <td>`+itm.payType.name+`</td>
                    <td>`+itm.status.name+`</td>
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showReceiptDetail(`+itm.sales+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>      
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showNote(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>  
                 </tr>`;
    }
    html += `</tbody></table>`;
    $('#chestTableDiv').html(html);
}

function createTicketTable(data) {

    let html = `<table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Fatura No.</th>
                            <th scope="col">Baslik</th>
                            <th scope="col">Tedarikci</th>
                            <th scope="col">Tutar</th>
                            <th scope="col">Durum</th>
                            <th scope="col">Not</th>
                        </tr>
                        </thead>
                        <tbody>`;

    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                    <td>`+itm.no+`</td>
                    <td>`+itm.title+`</td>
                    <td>`+itm.supplier.name+`</td>
                    <td>`+itm.price+`</td>
                    <td>`+itm.status.name+`</td>
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showNote(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>      
                 </tr>`;
    }
    html += `</tbody></table>`;
    $('#chestTableDiv').html(html);
}


function showReceiptDetail(sales) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Detay"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>    
                        <div class="modal-body">
                         <div class="row">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Ürün Adý</th>
                                    <th scope="col">Satýþ Fiyatý</th>
                                </tr>
                                </thead>
                                <tbody>`;

        for (let i = 0; i < sales.length; i++) {

            const sale = sales[i];
            html += `<tr role="row" class="odd">
                        <td>`+sale.name+`</td>
                        <td>`+sale.product.sell_price+`</td>
                    </tr>`;
        }

    html += `</tbody></table></div></div>`;

    $('#chestModalContent').html(html);
    $('#chestModal').modal('toggle');
}

function showNote(note) {
    let html = ``;
    html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Not"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3">
                            `+note+`
                       </div>
                    </div>`;

    $('#chestModalContent').html(html);
    $('#chestModal').modal('toggle');
}



function getData() {

    if (typeIdx === "1") { // receipt
        getAllReceipts(parseInt(payTypeIdx));
    } else { //ticket
        getAllTickets(parseInt(payTypeIdx));
    }
}
$("#type_select").on('change', function () {
    typeIdx = $("#type_select").val();
    getData();
});

$("#pay_type_select").on('change', function () {
    payTypeIdx = $("#pay_type_select").val();
    getData();
});

getAllReceipts(0);
getPayTypes();