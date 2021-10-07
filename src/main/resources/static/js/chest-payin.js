let receipts = [];
let selectedReceipt = {};
function getReceipts() {

    $.ajax({
        url: '/chest/receipts/' + 2,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            receipts = data;
            createReceiptSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getPayTypes() {

    $.ajax({
        url: '/chest/payTypes',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createPayTypeSelect(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createReceiptSelect() {

    let html = ``;
    for (let i = 0; i < receipts.length; i++) {
        const itm = receipts[i];
        html += `<option value="`+itm.id+`" data-subtext="`+itm.customer.name+ " " +itm.customer.surname+`">`+itm.no+`</option>`;
    }
    $("#r_select").append(html);
    $("#r_select").selectpicker("refresh");
}

function createPayTypeSelect(data) {

    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<option value="`+itm.id+`">`+itm.name+`</option>`;
    }
    $("#pay_type_select").append(html);
}


$("#r_select").on('change', function () {
    const id = $("#r_select").val();
    for(let i = 0; i < receipts.length; i++) {
        if (parseInt(id) === receipts[i].id) {
            selectedReceipt = receipts[i];
        }
    }
    $("#r_price").text(selectedReceipt.price);
    $("#r_discount").text(selectedReceipt.customer.discount);
    $("#r_no").text(selectedReceipt.no);
    createRow();
});

function createRow() {
    let html = ``;

    for (let i = 0; i < selectedReceipt.sales.length; i++) {
        const itm = selectedReceipt.sales[i];
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
                    <td class="text-right">
                      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onclick="showSaleNote(`+itm.note+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                      </div>
                    </td>      
                 </tr>`;
    }

    $('#tBodyChestReceipt').html(html);
}

$('#pay_in_form').submit( ( event ) => {
    event.preventDefault();

    const typeIndex = document.getElementById("pay_type_select").selectedIndex;
    selectedReceipt["paytype"] = {
        id: document.getElementById("pay_type_select").options[typeIndex].value,
    };
    selectedReceipt["note"] = $("#t_note").val();

    $.ajax({
        url: '/chest/payin/pay',
        type: 'POST',
        data: JSON.stringify(selectedReceipt),
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
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})


getReceipts();
getPayTypes();
