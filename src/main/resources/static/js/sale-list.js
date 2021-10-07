function getAllSales() {

    $.ajax({
        url: '/sale/all',
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

function createRow(data) {
    let html = ``;

    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
                    <td>`+itm.product.name+`</td>
                    <td>`+itm.product.unit.name+`</td>
                    <td>`+itm.product.type+`</td>
                    <td>`+itm.product.barcode+`</td>
                    <td>`+itm.product.code+`</td>
                    <td>`+itm.product.tax.amount+`</td>
                    <td>`+itm.product.buy_price+`</td>
                    <td>`+itm.product.sell_price+`</td>
                    <td>`+itm.product.category.name+`</td>
                    <td>`+itm.receipt.customer.name+" "+itm.receipt.customer.surname+`</td>
                    <td>`+itm.receipt.no+`</td>
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showSaleNote(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>      
                 </tr>`;
    }

    $('#tBodySale').html(html);
}

function showSaleNote(note) {
    let html = ``;
    html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Satýþ Detayý"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3">
                            `+note+`
                        </div>
                    </div>`;

    $('#saleNoteModalContent').html(html);
    $('#saleNoteModal').modal('toggle');
}

$('#sale_list_search').submit( ( event ) => {
    event.preventDefault();

    let key = $("#s_key").val();

    if(key === null || key === undefined || key === ""){
        key = "0";
    }

    $.ajax({
        url: '/sale/search/' + key,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            saleArr = data;
            createRow();

        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})

getAllSales();