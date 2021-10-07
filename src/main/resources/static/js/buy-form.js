let suppliers = [];
let selectedSupId = 0;
let selectedSupplier = {};

function getSupplierTickets() {

    $.ajax({
        url: '/buy/all/' + selectedSupId,
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

function getAllSuppliers() {

    $.ajax({
        url: '/supplier/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            suppliers = data;
            createSupplierSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })
}
getAllSuppliers();
function createSupplierSelect() {

    let html = ``;
    for (let i = 0; i < suppliers.length; i++) {
        const itm = suppliers[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#sup_select_buy").append(html);
    $("#sup_select_buy").selectpicker("refresh");
}

$("#sup_select_buy").on('change', function () {
    selectedSupId = $("#sup_select_buy").val();
    for(let i = 0; i < suppliers.length; i++) {
        if (parseInt(selectedSupId) === suppliers[i].id) {
            selectedSupplier = suppliers[i];
        }
    }
    getSupplierTickets();
});

function createRow(data) {

    let html = ``;

    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                    <td>`+itm.title+`</td>
                    <td>`+itm.price+`</td>
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showTicketNote(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>                 
                    </tr>`;
    }

    $('#tBodyBuyTickets').html(html);
}

$('#buy_add_form').submit( ( event ) => {
    event.preventDefault();

    const t_title = $("#t_title").val();
    const t_price = $("#t_price").val();
    const t_note = $("#t_note").val();

    const obj = {
        title: t_title,
        no: codeGenerator(),
        price: t_price,
        note: t_note,
        supplier: selectedSupplier
    }

    console.log(obj);

    $.ajax({
        url: '/buy/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== 0 ) {
                console.log(data);
                $('#buy_add_form').trigger("reset");
                createRow();
            }else {
                alert("Ýþlem sýrasýnda hata oluþtu!");
            }
        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem sýrýsýnda bir hata oluþtu!");
        }
    })
})

$('#buy_form_search').submit( ( event ) => {
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


function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    return time.toString().substring(3);
}

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

    $('#ticketNoteModalBuyFormContent').html(html);
    $('#ticketNoteModalBuyForm').modal('toggle');
}