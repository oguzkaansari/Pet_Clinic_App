let customers = [];
let products = [];
let selectedCustomerId = 0;
let selectedProductId = 0;
let selectedCustomer = {};
let selectedProduct = {};
let selectedReceipt = {};
let saleArr = []

function getAllCustomers() {

    $.ajax({
        url: '/customer/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            customers = data;
            createCustomerSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function getAllProducts() {

    $.ajax({
        url: '/product/all',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            products = data;
            createProductSelect();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getReceipt(id) {

    $.ajax({
        url: '/sale/receipt/' + id,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            selectedReceipt = data[0];
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function getSales(id) {

    $.ajax({
        url: '/sale/sales/' + id,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            saleArr = data;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createCustomerSelect() {

    let html = ``;
    for (let i = 0; i < customers.length; i++) {
        const itm = customers[i];
        html += `<option value="`+itm.id+`" data-subtext="`+itm.no+`">`+itm.name+ " " +itm.surname+`</option>`;
    }
    $("#c_select").append(html);
    $("#c_select").selectpicker("refresh");
}

function createProductSelect() {

    let html = ``;
    for (let i = 0; i < products.length; i++) {
        const itm = products[i];
        html += `<option value="`+itm.id+`" data-subtext="`+itm.code+`">`+itm.name+`</option>`;
    }
    $("#pr_select").append(html);
    $("#pr_select").selectpicker("refresh");
}

function createRow() {
    let html = ``;

    for (let i = 0; i < saleArr.length; i++) {
        const itm = saleArr[i];
        html += `<tr role="row" class="odd">
                    <td>`+itm.product.name+`</td>
                    <td>`+itm.product.unit.name+`</td>
                    <td>`+itm.product.type.name+`</td>
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

    $('#saleFormNoteModalContent').html(html);
    $('#saleFormNoteModal').modal('toggle');
}

$("#c_select").on('change', function () {
    selectedCustomerId = $("#c_select").val();
    for(let i = 0; i < customers.length; i++) {
        if (parseInt(selectedCustomerId) === customers[i].id) {
            selectedCustomer = customers[i];
        }
    }
    getReceipt(selectedCustomerId);
    getSales(selectedReceipt.id);
    createRow();
});

$("#pr_select").on('change', function () {
    selectedProductId = $("#pr_select").val();
    for(let i = 0; i < products.length; i++) {
        if (parseInt(selectedProductId) === products[i].id) {
            selectedProduct = products[i];
        }
    }
    $("#s_amount_label").text(selectedProduct.unit.name);
    //$("#price").text(selectedProduct.sell_price);
    $("#discount").text(selectedCustomer.discount);
});

$("#s_amount").on('change', function () {
    $("#price").text(selectedProduct.sell_price * this.value);
});

$('#sale_add_form').submit( ( event ) => {
    event.preventDefault();
    const saleObj = {
        product: selectedProduct,
        receipt: selectedReceipt,
        amount: $("#s_amount").val(),
        note: $("#s_note").val()
    }

    saleArr.push(saleObj);
    let price = selectedProduct.sell_price;
    price = (selectedProduct.sell_price * selectedCustomer.discount)/100;


    const obj = {
        no: codeGenerator(),
        price: price,
        customer: selectedCustomer,
        sales: saleArr
    }

    if(!jQuery.isEmptyObject(selectedReceipt)){
        obj["id"] = selectedReceipt.id;
        obj["no"] = selectedReceipt.no;
        obj["price"] = selectedReceipt.price + price;
        obj["sales"] = selectedReceipt.sales.concat(saleArr)
    }else{
        obj["status"] = {
            id: 2
        };
    }

    $.ajax({
        url: '/sale/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== 0 ) {
                console.log(data);
                alert("Islem basarili oldu");
                $('#sale_add_form').trigger("reset");
                createRow();
            }else {
                alert("Islem sirasinda hata olustu!");
            }
        },
        error: function (err) {
            console.log(err)
            alert("Islem sirasinda hata olustu!");
        }
    })
})

$('#sale_form_search').submit( ( event ) => {
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

function codeGenerator() {
    const date = new Date();
    const time = date.getTime();
    return time.toString().substring(3);
}

getAllCustomers();
getAllProducts();

